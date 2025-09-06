const { instance } = require("../config/razorpay");
const User = require("../models/User");
const Course = require("../models/Course");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");

//capture the payment and initiate the razorpay order
exports.capturePayment = async (req, res) => {
    //get the courseId
    const { courseId } = req.body;
    //get user id
    const userId = req.user.id;
    //validation
    //valid courseID
    if (!courseId) {
        return res.json({
            success: false,
            message: "Please Provide Valid Course ID"
        })
    };

    //valid courseDetails
    let course;
    try {
        course = await Course.findById(courseId);
        if (!course) {
            return res.json({
                success: false,
                message: "Could not find the course",
            });
        }


        //user already enrolled for the same course
        const uid = new mongoose.Types.ObjectId(userId);
        if (course.studentsEnrolled.includes(uid)) {
            return res.status(200).json({
                success: false,
                message: "Student is Already Enrolled",
            });
        }

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

    //order create
    const amount = course.price;
    const currency = "INR";

    const options = {
        amount: amount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes: {
            courseId: courseId,
            userId,
        }
    };

    try {
        //initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log("paymentResponse:", paymentResponse);

        //return response
        return res.status(200).json({
            success: true,
            courseName: course.courseName,
            courseDescription: course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount,
        })

    }
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Could not initiate order",
        });
    }
}

//verify signature of razorpay and server
exports.verifySignature = async (req, res) => {
    const webhookSecret = "12345678";

    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (signature === digest) {
        console.log("Payment is Authorised");

        //fulfill the action 

        //fetch the course id and userid
        const { courseId, userId } = req.body.payload.payments.entity.notes;

        try {
            //find the course and push user means enroll the student
            const enrolledCourse = await Course.findOneAndUpdate({ _id: courseId }, {
                $push: {
                    studentsEnrolled: userId,
                }
            },
                { new: true },
            )

            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message: "Course not Found",
                });
            }

            console.log(enrolledCourse);

            //find the student/user and update its course enrolled list
            const enrolledStudent = await User.findOneAndUpdate(
                { _id: userId },
                { $push: { courses: courseId } },
                { new: true },
            );

            console.log(enrolledStudent);


            //mail send karo confirmation wala
            // send course enrollment mail using template
            const emailResponse = await mailSender(
                enrolledStudent.email,
                "Course Enrolled Successfully",
                courseEnrollmentEmail(enrolledCourse.courseName, enrolledStudent.firstName)
            );

            console.log(emailResponse);

            return res.status(200).json({
                success: true,
                message: "Signature Verified and Course Added"
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }
    else {
        return res.status(400).json({
            success: false,
            message: "Invalid request",
        });
    }
}
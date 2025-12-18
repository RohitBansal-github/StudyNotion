const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
require("dotenv").config();
const { uploadImageTocloudinary } = require("../utils/imageUploader");
const CourseProgress = require("../models/CourseProgress");
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const { convertSecondsToDuration } = require("../utils/secToDuration");

//createCourse handler

exports.createCourse = async (req, res) => {
    try {
        //fetch data

        const { courseName, courseDescription, whatYouWillLearn, price, category, tag, status } = req.body;

        //get thumbnail
        const thumbnail = req.files.thumbnail;

        //validate data
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !tag || !thumbnail) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            })
        }

        //check instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details: ", instructorDetails);

        if (!instructorDetails) {
            return res.status(401).json({
                success: false,
                message: "Instructor Details are not Found",
            })
        }

        //check for category details

        const categoryDetails = await Category.findById(category);

        if (!categoryDetails) {
            return res.status(402).json({
                success: false,
                message: "Tag Details are not Found",
            })
        }

        //upload image to cloudinary
        const thumbnailImage = await uploadImageTocloudinary(thumbnail, process.env.FOLDER_NAME);

        //create entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            category: categoryDetails._id,
            tag,
            thumbnail: thumbnailImage.secure_url,
            status: "Draft",
        })

        //add new course details to the user schema of instructor
        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            { new: true }
        );


        //update category schema
        await Category.findByIdAndUpdate(
            categoryDetails._id,
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            { new: true }
        );


        //return response
        return res.status(200).json({
            success: true,
            message: "Course Created Successfully",
            data: newCourse,
        });



    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while Creating course"
        })
    }
}

//get allCourses handler

exports.showAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({}, {
            courseName: true,
            price: true,
            thumbnail: true,
            instructor: true,
            ratingAndReviews: true,
            studentsEnrolled: true,
        }).populate("instructor")
            .populate("category")
            //   .populate("ratingAndreviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();


        return res.status(200).json({
            success: true,
            message: "Data for all courses fetched successfully",
            data: allCourses,
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while getting All Courses"
        })
    }
}


//getCourseDetails
exports.getCourseDetails = async (req, res) => {
    try {
        //get id 
        const { courseId } = req.body;
        ////find courseDetails
        const courseDetails = await Course.find({ _id: courseId })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                }
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                }
            })
            .exec();
        //validation
        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find the course with ${courseId}`,
            });
        }

        //return response
        return res.status(200).json({
            success: true,
            message: "Course Details fetched successfully",
            data: courseDetails,
        })


    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}



exports.getFullCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body
        const userId = req.user.id
        const courseDetails = await Course.findOne({
            _id: courseId,
        })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec()

        let courseProgressCount = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId,
        })

        console.log("courseProgressCount : ", courseProgressCount)

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${courseId}`,
            })
        }

        // if (courseDetails.status === "Draft") {
        //   return res.status(403).json({
        //     success: false,
        //     message: `Accessing a draft course is forbidden`,
        //   });
        // }

        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        return res.status(200).json({
            success: true,
            data: {
                courseDetails,
                totalDuration,
                completedVideos: courseProgressCount?.completedVideos
                    ? courseProgressCount?.completedVideos
                    : [],
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


// Edit Course Details
exports.editCourseDetails = async (req, res) => {
    try {
        console.log("EDIT COURSE BODY:", req.body)
        console.log("EDIT COURSE FILES:", req.files)
        const { courseId } = req.body
        const updates = req.body
        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).json({ error: "Course not found" })
        }

        // If Thumbnail Image is found, update it

        if (req.files && req.files.thumbnail) {
            const thumbnail = req.files.thumbnail
            const thumbnailImage = await uploadImageTocloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            )
            course.thumbnail = thumbnailImage.secure_url
        }


        // Update only the fields that are present in the request body

        const allowedUpdates = [
            "courseName",
            "courseDescription",
            "price",
            "tag",
            "whatYouWillLearn",
            "category",
            "instructions",
            "status",
        ]

        allowedUpdates.forEach((key) => {
            if (updates[key] !== undefined) {

                // arrays
                if (key === "tag" || key === "instructions") {
                    if (Array.isArray(updates[key])) {
                        course[key] = updates[key]
                    } else {
                        try {
                            course[key] = JSON.parse(updates[key])
                        } catch {
                            course[key] = [updates[key]]
                        }
                    }
                }
                // ✅ normal fields (description, name, etc)
                else {
                    course[key] = updates[key]
                }
            }
        })

        await course.save()

        const updatedCourse = await Course.findOne({
            _id: courseId,
        })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec()

        res.json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}



// Get Course List
exports.getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find(
            { status: "Published" },
            {
                courseName: true,
                price: true,
                thumbnail: true,
                instructor: true,
                ratingAndReviews: true,
                studentsEnrolled: true,
            }
        )
            .populate("instructor")
            .exec()

        return res.status(200).json({
            success: true,
            data: allCourses,
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            success: false,
            message: `Can't Fetch Course Data`,
            error: error.message,
        })
    }
}



// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
    try {
        // Get the instructor ID from the authenticated user or request body
        const instructorId = req.user.id

        // Find all courses belonging to the instructor
        const instructorCourses = await Course.find({
            instructor: instructorId,
        }).sort({ createdAt: -1 })

        // Return the instructor's courses
        res.status(200).json({
            success: true,
            data: instructorCourses,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        })
    }
}
// Delete the Course
exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body

        // Find the course
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }

        // Unenroll students from the course
        const studentsEnrolled = course.studentsEnrolled
        for (const studentId of studentsEnrolled) {
            await User.findByIdAndUpdate(studentId, {
                $pull: { courses: courseId },
            })
        }

        // Delete sections and sub-sections
        const courseSections = course.courseContent
        for (const sectionId of courseSections) {
            // Delete sub-sections of the section
            const section = await Section.findById(sectionId)
            if (section) {
                const subSections = section.subSection
                for (const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }

            // Delete the section
            await Section.findByIdAndDelete(sectionId)
        }

        // Delete the course
        await Course.findByIdAndDelete(courseId)

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        })
    }
}




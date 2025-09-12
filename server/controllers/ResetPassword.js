
// -- hume email send krna hain user email pr jaha link hogi jisse bo password reset kr sakega lekin hume ye link bs kuch smay ke liye active rakhni hain 
//token generate karenge hum kyuki jab user link par click karega to usko user data base access chaiye password update krne ke liye to hum yaha token ki madad se user database ko access kr skenge

const User = require("../models/User");
const bcrypt = require("bcrypt");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");
const { passwordUpdateEmail } = require("../mail/templates/passwordUpdateEmail");



//resetPasswordtoken 
exports.resetPasswordToken = async (req, res) => {
    try {
        //get email from body
        const { email } = req.body;

        //verify email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Your Email is Not registered with us.",
            })
        }

        //generate token
        const token = crypto.randomUUID();
        //update user by adding toekn and expiration time
        const updatedDetail = await User.findOneAndUpdate(
            { email: email }, {
            token: token,
            resetPasswordExpires: Date.now() + 5 * 60 * 1000,
        },
            { new: true }
        );

        //create url
        const url = `http://localhost:3000/update-password/${token}`
        //send email containing url
        await mailSender(email, `Password reset link - ${url}`, "Password Reset Link");

        //return response
        return res.status(200).json({
            success: true,
            message: "Email sent successfully,please check email and change pwd."
        });


    }
    catch (error) {
        console.log(error);
        return req.status(500).json({
            success: false,
            message: "Something went wrong while sending reset pwd mail."
        })
    }
}





//resetPassword

exports.resetPassword = async (req, res) => {
    try {
        //fetch data
        const { password, confirmPassword, token } = req.body;

        //validation
        if (password !== confirmPassword) {
            return res.status(403).json({
                success: false,
                message: "password Not Matching"
            })
        }

        //get user details from the db using token
        const userDetails = await User.findOne({ token: token });
        //verify userDetails
        if (!userDetails) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token"
            })
        }

        //token time check
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(401).json({
                success: false,
                message: "Token is Expired, please regenerate your token",
            });
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //update password in db
        await User.findOneAndUpdate(
            { token },
            {
                password: hashedPassword,
                token: null,
                resetPasswordExpires: null,
            },
            { new: true }
        );


        // send confirmation mail
        await mailSender(
            userDetails.email,
            passwordUpdateEmail(userDetails.name, userDetails.email), // body
            "Password Updated Successfully" // title
        );

        //return response
        return res.status(200).json({
            success: true,
            message: "Password reset successfully.",
        })

    }
    catch (error) {
        console.error("Reset Password Error: ", error);
        return res.status(500).json({
            success: false,
            message: "something went wrong while reset password."
        })
    }
}

const otpGenerator = require('otp-generator');
const User = require('../models/User');
const Profile = require("../models/Profile");
const OTP = require('../models/OTP');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const otpTemplate = require("../mail/templates/emailVerificationTemplate");


//send otp

exports.sendOTP = async (req, res) => {

    try {
        //fetch email
        const { email } = req.body;

        const alreadyExists = await User.findOne({ email });

        if (alreadyExists) {
            return res.status(401).json({
                success: false,
                message: "User is already registered.",
            })
        }

        //generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("OTP Generated:", otp);

        //check Unique and recent otp in the db

        const result = await OTP.findOne({ otp: otp });

        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({ otp: otp });
        }

        // yaha aa gye yaani unique code mil gya 
        //now create entry otp in OTP model

        const otpBody = await OTP.create({ email, otp }); // ✅ Direct field pass karo


        console.log(otpBody);

        return res.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
            otp,
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }



}

//Sign Up

exports.signUp = async (req, res) => {

    try {
        //fetch data 
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } = req.body;

        //validate karlo -- field should not empty
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "All Fields are Required."
            })
        }

        //validate email, password and otp

        const alreadyExists = await User.findOne({ email });

        if (alreadyExists) {
            return res.status(401).json({
                success: false,
                message: "User is already registered.",
            })
        }
        //match two password
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password does not match, Please try again.",
            })
        }

        //most recent otp
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log("recent otp:", recentOtp);

        //validate otp
        if (recentOtp.length == 0) {
            //otp not found
            return res.status(400).json({
                success: false,
                message: "OTP Not Found"
            })
        } else if (otp !== recentOtp[0].otp) {
            //Invalid OTP
            res.send(400).json({
                success: false,
                message: "Invalid OTP",
            })
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //entry in db
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,

        })

        //return response

        return res.status(200).json({
            success: true,
            message: "User is registered successfully.",
            user,
        })


    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while Sign Up."
        })
    }


}

//Login

exports.Login = async (req, res) => {

    try {
        //fetch data
        const { email, password } = req.body;

        //validate the data
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required, please try again",
            });
        }

        //check for existing user

        const user = await User.findOne({ email }).populate("additionalDetails");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered, Please Sign up first",
            })
        }

        //compare password and generate jwt
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            user.token = token;
            user.password = undefined;

            //create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in Successfully."
            })

        }
        else {
            return res.status(400).json({
                success: false,
                message: "Password is Incorrect.",
            });
        }

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while login, Please try again."
        })
    }


}

//change Password

exports.changePassword = async (req, res) => {
    try {
        //fetch email, password, new password ,confirm new password
        const { email, password, newPassword, confirmNewPassword } = req.body;
        //validate data
        if (!email || !password || !newPassword || !confirmNewPassword) {
            return res.status(403).json({
                success: false,
                message: "All fields are required, please try again."
            })
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "New password and confirm password do not match."
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Check current password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect current password."
            });
        }

        // Hash new password and upadte pwd in db
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        //send mail-- use mailSender -->Password updated title
        try {
            await mailSender(email, "Your password has been changed.", "Password Updated");
        } catch (err) {
            console.log("Email send failed:", err);
        }
        //return response
        return res.status(200).json({
            success: true,
            message: "Password changed successfully."
        })
    }
    catch (error) {
        console.error("Error while changing password:", error);
        return res.status(500).json({
            success: false,
            message: "Issue while Changing Password."
        })
    }


}


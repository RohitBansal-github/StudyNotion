const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const {uploadImageTocloudinary} = require("../utils/imageUploader");

//update profile handler
exports.profileUpdate = async (req, res) => {
    try {
        //fetch data
        const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
        //get the user id
        const id = req.user.id;

        //validate the data
        if (!contactNumber || !gender) {
            return res.status(403).json({
                success: false,
                message: "ContactNumber and gender is required",
            })
        }

        //find profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        //update the profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;
        await profileDetails.save();

        //return response
        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            profileDetails,
        })

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to Update Profile, please try again",
            error: error.message,
        })
    }
}

//deleteAccount
//TODO: Find the way how can we schedule this delete request operation
exports.deleteAccount = async (req, res) => {
    try {
        //get id
        const id = req.user.id;
        //validation
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not Found",
            });
        }
        //delete profile
        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

        //TODO:unenroll user from the enrolled courses

        await Course.updateMany(
            { studentsEnrolled: id },
            { $pull: { studentsEnrolled: id } }
        );

        //delete User
        await User.findByIdAndDelete({ _id: id });

        //return response
        return res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to delete the Account, please try again.",
            error: error.message 
        })
    }
}

//get allUserDetails

exports.getAllUserDetails=async(req,res)=>{
    try{
        //get id
        const id=req.user.id;

        //validation for id
        const userDetails=await User.findById(id).populate("additionalDetails").exec();
        //return response
        return res.status(200).json({
            success:true,
            message:"User Data Fetched Successfully",
            data: userDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to get all User details, please try again.", 
        })
    }
}

//updateDisplayPicture handler

exports.updateDisplayPicture = async (req, res) => {
    try {
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;

        if (!displayPicture) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        const image = await uploadImageTocloudinary(
            displayPicture,
            process.env.FOLDER_NAME
        );

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { image: image.secure_url },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update profile picture, please try again.",
            error: error.message,
        });
    }
};




//getEnrolledCourses handler

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId)
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: {
                        path: "subSection",
                    },
                },
            })
            .exec();

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Enrolled courses fetched successfully",
            data: user.courses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch enrolled courses",
            error: error.message,
        });
    }
};


const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const {uploadImageTocloudinary} = require("../utils/imageUploader");
const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utils/secToDuration");

//update profile handler
exports.profileUpdate = async (req, res) => {
    try {
        //fetch data
        const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
        const id = req.user.id; // get user id

        //validate the data
        if (!contactNumber || !gender) {
            return res.status(403).json({
                success: false,
                message: "ContactNumber and gender is required",
            });
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

        //fetch updated user with populated profile
        const updatedUser = await User.findById(id).populate("additionalDetails");

        //return response
        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            updatedUserDetails: updatedUser, // now frontend can safely access this
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to Update Profile, please try again",
            error: error.message,
        });
    }
};


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
    const userId = req.user.id
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec()
    userDetails = userDetails.toObject()
    var SubsectionLength = 0
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0
      SubsectionLength = 0
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        )
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      })
      courseProgressCount = courseProgressCount?.completedVideos.length
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2)
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};

exports.instructorDashboard = async(req,res) =>{
  try{
    const courseDetails = await Course.find({instructor: req.user.id});

    const courseData = courseDetails.map((course)=>{
      const totalStudentsEnrolled = course.studentsEnrolled.length;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      // create new object with the additional fields 
      const courseDataWithStats = {
        id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    })

    res.status(200).json({
      success:true,
      courses:courseData,
    })
  }
  catch(error){
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Internal Server Error"
    })
  }
}





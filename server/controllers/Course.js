const Course=require("../models/Course");
const Category=require("../models/Category");
const User=require("../models/User");
require("dotenv").config();
const{uploadImageTocloudinary}=require("../utils/imageUploader");

//createCourse handler

exports.createCourse=async(req,res)=>{
    try{
        //fetch data

        const{courseName,courseDescription,whatYouWillLearn,price,category,tag}=req.body;

        //get thumbnail
        const thumbnail=req.files.thumbnail;

        //validate data
        if(!courseName||!courseDescription||!whatYouWillLearn||!price||!category||!tag||!thumbnail){
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            })
        }

        //check instructor
        const userId=req.user.id;
        const instructorDetails=await User.findById(userId);
        console.log("Instructor Details: ",instructorDetails);

        if(!instructorDetails){
            return res.status(401).json({
                success:false,
                message:"Instructor Details are not Found",
            })
        }

        //check for category details

        const categoryDetails=await Category.findById(category);

        if(!categoryDetails){
            return res.status(402).json({
                success:false,
                message:"Tag Details are not Found",
            })
        }

        //upload image to cloudinary
        const thumbnailImage=await uploadImageTocloudinary(thumbnail,process.env.FOLDER_NAME);

        //create entry for new course
        const newCourse=await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            category:categoryDetails._id,
            tag,
            thumbnail:thumbnailImage.secure_url,
        })

        //add new course details to the user schema of instructor
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true}
        );


        //update category schema
        await Category.findByIdAndUpdate(
            {_id:categoryDetails._id},
            {
                $push:{
                    category:categoryDetails.category,
                }
            },
            {new:true},
        );

        //return response
        return res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            data:newCourse,
        });



    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while Creating course"
        })
    }
}

//get allCourses handler

exports.showAllCourses=async(req,res)=>{
    try{
        const allCourses=await Course.find({},{courseName:true,
                                              price:true,
                                              thumbnail:true,
                                              instructor:true,
                                              ratingAndReviews:true,
                                              studentsEnrolled:true,
                                              }).populate("instructor")
                                              .populate("category")
                                            //   .populate("ratingAndreviews")
                                              .populate({
                                                path:"courseContent",
                                                populate:{
                                                    path:"subSection",
                                                },
                                              })
                                              .exec();


        return res.status(200).json({
            success:true,
            message:"Data for all courses fetched successfully",
            data:allCourses,
        })                                      
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while getting All Courses"
        })
    }
}


//getCourseDetails
exports.getCourseDetails=async(req,res)=>{
    try{
    //get id 
    const{courseId}=req.body;
    ////find courseDetails
    const courseDetails=await Course.find({_id:courseId})
                                          .populate({
                                            path:"instructor",
                                            populate:{
                                                path:"additionalDetails",
                                            }
                                          })
                                          .populate("category")
                                          .populate("ratingAndReviews")
                                          .populate({
                                            path:"courseContent",
                                            populate:{
                                                path:"subSection",
                                            }
                                          })
                                          .exec();
            //validation
            if(!courseDetails){
                return res.status(400).json({
                    success:false,
                    message:`Could not find the course with ${courseId}`,
                });
            }

            //return response
            return res.status(200).json({
                success:true,
                message:"Course Details fetched successfully",
                data:courseDetails,
            })
    
                                          
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}




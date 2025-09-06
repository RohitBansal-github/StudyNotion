const Section = require("../models/Section");
const Course = require("../models/Course");

//create course handler

exports.createSection = async (req, res) => {
    try {
        //fetch data
        const { sectionName, courseId } = req.body;
        //data validation
        if (!sectionName || !courseId) {
            return res.status(403).json({
                success: false,
                message: "All fields are required, please try again",
            })
        }
        //create section
        const newSection = await Section.create({ sectionName });

        //update course with section objectID
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
            {
                $push: {
                    courseContent: newSection._id,
                }
            },
            { new: true }
        )
        .populate({
            path: "courseContent",
            populate: { path: "subSection" }
        })

        //return response

        return res.status(200).json({
            success: true,
            message: "Section created Successfully",
            data: updatedCourseDetails,
        });


    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to Create Course, please try again",
            error: error.message,
        })
    }
}

//update course handler

exports.updateSection=async(req,res)=>{
    try{
        //fetch data
        const { sectionName, sectionId } = req.body;
        //data validation
        if (!sectionName || !sectionId) {
            return res.status(403).json({
                success: false,
                message: "All fields are required, please try again",
            })
        }

        //update 
        const section=await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});

        //return response

        return res.status(200).json({
            success:true,
            message:"Section Updated Successfully",
        });

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to Update Section, please try again",
            error: error.message,
        })
    }
}

//delete section handler 

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;

    // Validation
    if (!sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Section ID and Course ID are required",
      });
    }

    // Delete the Section
    await Section.findByIdAndDelete(sectionId);

    // Pull the sectionId from courseContent array of Course
    await Course.findByIdAndUpdate(courseId, {
      $pull: {
        courseContent: sectionId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Section deleted and reference removed from course",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete Section, please try again",
      error: error.message,
    });
  }
};

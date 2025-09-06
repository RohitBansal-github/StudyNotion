const SubSection=require("../models/SubSection");
const Section=require("../models/Section");
const {uploadImageTocloudinary}=require("../utils/imageUploader");
require("dotenv").config();

//createSubSection handler
exports.createSubSection=async(req,res)=>{
    try{
        //fetch data
        const{sectionId,title,timeDuration,description}=req.body;
        //extract file/video
        const video=req.files.videoFile;
        //validation
        if(!sectionId||!title||!timeDuration||!description||!video){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }

        //upload video to cloudinary
        const uploadDetails=await uploadImageTocloudinary(video,process.env.FOLDER_NAME);
        //create subsection
        const subSectionDetails=await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })

        //update section
        const updatedSection=await Section.findByIdAndUpdate({_id:sectionId},
            {
                $push:{
                    subSection:subSectionDetails._id,
                }
            },
            {new:true},
        ).populate("subSection").exec();

        //TODO:log updated section here after adding populated query

        //return response
        return res.status(200).json({
            success:true,
            message:"SubSection Created Successfully",
            updatedSection,
        })
         

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to Create SubSection, please try again",
            error:error.message,
        })
    }
}

//update subsection handler

exports.updateSubSection = async (req, res) => {
  try {
    const { subSectionId, title, timeDuration, description } = req.body;
    const video = req.files?.videoFile;

    if (!subSectionId) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    const updatePayload = {
      title,
      timeDuration,
      description,
    };

    if (video) {
      const uploadDetails = await uploadImageTocloudinary(video, process.env.FOLDER_NAME);
      updatePayload.videoUrl = uploadDetails.secure_url;
    }

    const updatedSubSection = await SubSection.findByIdAndUpdate(
      subSectionId,
      updatePayload,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "SubSection Updated Successfully",
      data: updatedSubSection,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update subsection",
      error: error.message,
    });
  }
};



//delete subsection hanlder
exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;

    if (!subSectionId || !sectionId) {
      return res.status(403).json({
        success: false,
        message: "SubSection ID and Section ID are required",
      });
    }

    // Remove from SubSection collection
    await SubSection.findByIdAndDelete(subSectionId);

    // Remove reference from Section.subSection array
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $pull: { subSection: subSectionId },
      },
      { new: true }
    ).populate("subSection");

    return res.status(200).json({
      success: true,
      message: "SubSection deleted successfully",
      updatedSection,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete subsection",
      error: error.message,
    });
  }
};


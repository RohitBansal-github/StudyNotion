const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");



exports.updateCourseProgress = async(req,res) =>{

    const{courseId, subSectionId} = req.body;
    const userId = req.user.body;

    try{
        // check if the subsection is valid

        const subSection = await SubSection.findById(subSectionId);

        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"Invalid SubSection"
            });
        }

        // check for old entry
        let courseProgress = await CourseProgress.findOne({
            courseID:courseId,
            userId:userId,
        });

        if(!courseProgress){
            return res.status(404).json({
                success:false,
                message:"Course Progress does not Exist"
            })
        }
        else{

            // check for recompleting the video/subsection

            if(courseProgress.completedVideos.includes(subSectionId)){
                return res.status(400).json({
                    error:"SubSection already completed",
                })
            }

            // push in to completed videos
            courseProgress.completedVideos.push(subSectionId);

        }
        await courseProgress.save();

        return res.status(200).json({
            success:true,
            message:"Course Progress Updated SuccessFully",
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }


}
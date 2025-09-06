//import required modules
const express=require("express");
const router=express.Router();

//Import course controller
const{createCourse,showAllCourses,getCourseDetails}=require("../controllers/Course");

//Import category controller
const{createCategory,showAllCategories,categoryPageDetails}=require("../controllers/Category");

//Import section controller
const{createSection,updateSection,deleteSection}=require("../controllers/Section");

//Import subsection controller
const{createSubSection,updateSubSection,deleteSubSection}=require("../controllers/SubSection");

//Import rating and review controller
const{createRating,getAverageRating,getAllRating}=require("../controllers/RatingandReview");

//Import middleware

const{auth,isInstructor,isStudent,isAdmin}=require("../middlewares/auth");

//course can only be created by Instructor
router.post("/createCourse",auth,isInstructor,createCourse);
//Add section in the course
router.post("/addSection",auth,isInstructor,createSection);
//update section in the course
router.post("/updateSection",auth,isInstructor,updateSection);
//Delete section from the course
router.delete("/deleteSection",auth,isInstructor,deleteSection);
//Add subSection
router.post("/addSubSection",auth,isInstructor,createSubSection);
//Edit subSection
router.post("/updateSubSection",auth,isInstructor,updateSubSection);
//delete subSection
router.delete("/deleteSubSection",auth,isInstructor,deleteSubSection);

//get all registered courses
router.get("/showAllCourses",showAllCourses);
//get specific course details
router.post("/getCourseDetails",getCourseDetails);


//***************//
//category route//
//*************//

router.post("/createCategory",auth,isAdmin,createCategory);
router.get("/showAllCategories",showAllCategories);
router.post("/getCategoryPageDetails",categoryPageDetails)


//***************//
//rating and review routes//
//*************//

router.post("/createRating",auth,isStudent,createRating);
router.get("/getAverageRating",getAverageRating);
router.get("/getAllRating",getAllRating);

module.exports=router;


//import required modules
const express=require("express");
const router=express.Router();

//Import course controller
const{createCourse,showAllCourses,getCourseDetails,editCourseDetails,deleteCourse,getFullCourseDetails}=require("../controllers/Course");
const { getInstructorCourses } = require("../controllers/Course");

//Import category controller
const{createCategory,showAllCategories,categoryPageDetails}=require("../controllers/Category");

//Import section controller
const{createSection,updateSection,deleteSection}=require("../controllers/Section");

//Import subsection controller
const{createSubSection,updateSubSection,deleteSubSection}=require("../controllers/SubSection");

//Import rating and review controller
const{createRating,getAverageRating,getAllRating}=require("../controllers/RatingandReview");

const {updateCourseProgress} = require("../controllers/courseProgress");

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

router.put("/editCourse",auth,isInstructor,editCourseDetails);

// Fetch all courses of logged-in instructor
router.get(
  "/getInstructorCourses",
  auth,
  isInstructor,
  getInstructorCourses
);

router.post(
  "/getFullCourseDetails",
  auth,
  isStudent,
  getFullCourseDetails
);





// Delete a course
router.delete(
  "/deleteCourse",
  auth,
  isInstructor,
  deleteCourse
);

// update the course completion progress

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);



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


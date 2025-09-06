//import required modules
const express=require("express");
const router=express.Router();
const{auth}=require("../middlewares/auth");

const{deleteAccount,profileUpdate,getAllUserDetails,updateDisplayPicture,getEnrolledCourses}=require("../controllers/Profile");

//*************// Profile Routes //*****************//

//Delete user account
router.delete("/deleteAccount",auth,deleteAccount);
router.put("/updateProfile",auth,profileUpdate);
router.get("/getAllUserDetails",auth,getAllUserDetails);

//get enrolled courses
router.get("/getEnrolledCourses",auth,getEnrolledCourses);
router.put("/updateDisplayPicture",auth,updateDisplayPicture);

module.exports=router;


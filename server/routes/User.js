//import required modules
const express=require("express");
const router=express.Router();

const{sendOTP,signUp,Login,changePassword}=require("../controllers/Auth");
const{resetPasswordToken,resetPassword}=require("../controllers/ResetPassword");

//middleware
const{auth}=require("../middlewares/auth");

//routes for login,signu and authentication

router.post("/signUp",signUp);
router.post("/login",Login);

//route send otp to the user email
router.post("/sendotp",sendOTP);

//router for changing password
router.post("/changePassword",auth,changePassword);

//******// Reset Password //*************//

//route for generating resetpassword token
router.post("/reset-password-token",resetPasswordToken);

//router for reseting user's password after verification
router.post("/reset-password",resetPassword);

//Export the router for use in the main application
module.exports=router;

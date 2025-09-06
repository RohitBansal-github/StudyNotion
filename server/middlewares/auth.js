const jwt=require("jsonwebtoken"); 
require("dotenv").config();
const User=require("../models/User");


//auth
exports.auth=async(req,res,next)=>{
    try{
        //fetch token 
        const token = req.body?.token||req.cookies?.token||req.header("Authorization")?.replace("Bearer ","");

        //validate token
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is Missing.",
            });
        }

        //verify the token
        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user=decode;
        }
        catch(error){
            //verification- issue
            return res.status(401).json({
                success:false,
                message:"Token is Invalid"
            });
        }

        next();


    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while validating token."
        })
    }
}

//isStudent
exports.isStudent=async(req,res,next)=>{
    try{
        if(req.user.accountType!=="Student"){
            return res.status(401).json({
                success:false,
                message:"This is Protected route for Student."
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role is not verified,please try again"
        })
    }
}

//isInstructor
exports.isInstructor=async(req,res,next)=>{
    try{
        if(req.user.accountType!=="Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is Protected route for Instructor."
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role is not verified,please try again"
        })
    }
}

//isAdmin
exports.isAdmin=async(req,res,next)=>{
    try{
        if(req.user.accountType!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is Protected route for Admin."
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role is not verified,please try again"
        })
    }
}

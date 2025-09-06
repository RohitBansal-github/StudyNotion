const mongoose=require("mongoose");

const ratingAndReviewSchema=new mongoose.Schema({
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:String,
        trim:true,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        index:true,
    }
});

module.exports=mongoose.model("RatingAndReview",ratingAndReviewSchema);
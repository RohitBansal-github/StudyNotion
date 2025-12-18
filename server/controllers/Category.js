const Category = require('../models/Category');
const Course = require("../models/Course");

//create category ka handler function
exports.createCategory = async (req, res) => {
    try {
        //fetch data
        const { name, description } = req.body;
        //validation
        if (!name || !description) {
            return res.status(403).json({
                success: false,
                message: "All fields are required."
            })
        }
        //create entry
        const categoryDetails = await Category.create({ name: name, description: description, });
        console.log(categoryDetails);

        //return response
        return res.status(200).json({
            success: true,
            message: "Category Created Successfully.",
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//getallcategories handler function
exports.showAllCategories = async (req, res) => {
    try {
        const AllCategories = await Category.find({}, { name: true, description: true });
        return res.status(200).json({
            success: true,
            message: "All tags returned successfully.",
            AllCategories,
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//categoryPageDetails
exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }

    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: { path: "instructor" },
      })
      .exec();

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data not Found",
      });
    }

    const differentCategory = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: { path: "instructor" },
      })
      .exec();

    const topSellingCourses = await Course.aggregate([
      { $match: { status: "Published" } },
      {
        $addFields: {
          enrolledCount: { $size: "$studentsEnrolled" },
        },
      },
      { $sort: { enrolledCount: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "instructor",
          foreignField: "_id",
          as: "instructor",
        },
      },
      { $unwind: "$instructor" },
    ]);

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        topSellingCourses,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

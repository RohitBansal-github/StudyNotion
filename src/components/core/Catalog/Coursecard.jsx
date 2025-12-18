import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../common/RatingStars";
import GetAvgRating from "../../../utils/avgRating";

const Coursecard = ({ course, Height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);

  return (
    <Link
      to={`/courses/${course?._id}`}
      onClick={(e) => e.stopPropagation()}
      className="group"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-richblack-800 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-richblack-700">

        {/* ===== Thumbnail ===== */}
        <div className="overflow-hidden">
          <img
            src={course?.thumbnail}
            alt="Course Thumbnail"
            className={`${Height} w-full object-cover transition-transform duration-300 group-hover:scale-110`}
          />
        </div>

        {/* ===== Content ===== */}
        <div className="flex flex-col gap-2 p-4">
          
          {/* Course Title */}
          <p className="text-lg font-semibold text-richblack-5 line-clamp-2">
            {course?.courseName}
          </p>

          {/* Instructor */}
          <p className="text-sm text-richblack-300">
            {course?.instructor?.firstName}{" "}
            {course?.instructor?.lastName}
          </p>

          {/* Ratings */}
          <div className="mt-1 flex items-center gap-2 text-sm">
            <span className="font-medium text-yellow-100">
              {avgReviewCount || 0}
            </span>

            <RatingStars Review_Count={avgReviewCount} />

            <span className="text-richblack-400">
              ({course?.ratingAndReviews?.length || 0})
            </span>
          </div>

          {/* Price */}
          <p className="mt-3 text-xl font-bold text-yellow-50">
            ₹{course?.price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Coursecard;

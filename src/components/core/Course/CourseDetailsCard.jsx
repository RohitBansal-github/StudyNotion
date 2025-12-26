import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { addToCart } from "../../../slices/cartSlice";
import { FiShare2 } from "react-icons/fi";

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { thumbnail: ThumbnailImage, price: CurrentPrice } = course;

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor, you can't buy a course");
      return;
    }

    if (token) {
      dispatch(addToCart(course));
      toast.success("Course added to cart");
      return;
    }

    setConfirmationModal({
      text1: "You are not Logged in",
      text2: "Please login to purchase the course",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link Copied to Clipboard");
  };

  const isEnrolled = user && course?.studentsEnrolled.includes(user?._id);

  return (
    <div className="flex flex-col items-center gap-6 rounded-md bg-richblack-700 p-6 text-richblack-5 shadow-lg mr-8">
      {/* Thumbnail */}
      <img
        src={ThumbnailImage}
        alt="Thumbnail"
        className="max-h-[300px] w-full rounded-xl object-cover"
      />

      {/* Price */}
      <p className="text-2xl font-bold">Rs. {CurrentPrice}</p>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 w-full">
        <button
          className="w-full rounded-md bg-yellow-50 px-4 py-2 text-center text-richblack-900 font-semibold hover:bg-yellow-100 transition"
          onClick={isEnrolled ? () => navigate("/dashboard/enrolled-courses") : handleBuyCourse}
        >
          {isEnrolled ? "Go to Course" : "Buy Now"}
        </button>

        {!isEnrolled && (
          <button
            onClick={handleAddToCart}
            className="w-full rounded-md bg-yellow-50 px-4 py-2 text-center text-richblack-900 font-semibold hover:bg-yellow-100 transition"
          >
            Add to Cart
          </button>
        )}
      </div>

      {/* Course Info */}
      <div className="w-full text-center">
        <p className="text-sm">30-Day Money-Back Guarantee</p>
        <p className="mt-2 font-semibold">This Course Includes:</p>
        <ul className="mt-2 flex flex-col gap-2 list-disc list-inside text-sm text-richblack-300">
          {course?.instructions?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Share Button as React Icon Button */}
      <button
        onClick={handleShare}
        className="mt-4 flex items-center justify-center gap-2 w-full rounded-md bg-richblack-600 text-yellow-50 px-4 py-2 font-semibold hover:bg-richblack-500 hover:text-yellow-100 transition"
      >
        <FiShare2 size={20} />
        Share
      </button>
    </div>
  );
}

export default CourseDetailsCard;

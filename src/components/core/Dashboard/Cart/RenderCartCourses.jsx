import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri';
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../../../slices/cartSlice';

function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-6">
      {
        cart.map((course) => (
          <div
            key={course._id}
            className="flex flex-col gap-4 rounded-lg border border-richblack-700 bg-richblack-800 p-4 sm:flex-row"
          >
            
            {/* Left: Image + Info */}
            <div className="flex flex-1 gap-4">
              <img
                src={course?.thumbnail}
                alt={course?.courseName}
                className="h-[90px] w-[140px] rounded-md object-cover"
              />

              <div className="flex flex-col gap-1">
                <p className="text-lg font-semibold">
                  {course?.courseName}
                </p>

                <p className="text-sm text-richblack-300">
                  {course?.category?.name}
                </p>

                <div className="flex items-center gap-2 text-sm">
                  <span className="text-yellow-100 font-medium">4.8</span>

                  <ReactStars
                    count={5}
                    size={18}
                    edit={false}
                    activeColor="#ffd700"
                  />

                  <span className="text-richblack-300">
                    ({course?.ratingAndReviews?.length || 0} Ratings)
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Price + Remove */}
            <div className="flex flex-row items-center justify-between gap-4 sm:flex-col sm:items-end">
              <button
                onClick={() => dispatch(removeFromCart(course._id))}
                className="flex items-center gap-2 rounded-md border border-pink-700 bg-pink-800/20 px-3 py-1 text-pink-200 hover:bg-pink-800/40 transition"
              >
                <RiDeleteBin6Line />
                <span>Remove</span>
              </button>

              <p className="text-lg font-semibold text-yellow-100">
                ₹ {course?.price}
              </p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default RenderCartCourses

import React from 'react'
import { useSelector } from 'react-redux';
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';

function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 text-richblack-5">
      
      {/* Heading */}
      <h1 className="mb-2 text-3xl font-semibold">
        Your Cart
      </h1>
      <p className="mb-8 text-richblack-300">
        {totalItems} Course{totalItems !== 1 && "s"} in Cart
      </p>

      {
        total > 0 ? (
          <div className="flex flex-col gap-8 lg:flex-row">
            
            {/* Left: Cart Courses */}
            <div className="flex-1">
              <RenderCartCourses />
            </div>

            {/* Right: Total Amount */}
            <div className="w-full lg:max-w-sm">
              <RenderTotalAmount />
            </div>

          </div>
        ) : (
          <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-richblack-700 bg-richblack-800">
            <p className="text-richblack-300">
              Your Cart is Empty 🛒
            </p>
          </div>
        )
      }
    </div>
  )
}

export default Cart

import React from 'react'
import frameImage from "../../../assets/Images/frame.png"
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import { FcGoogle } from 'react-icons/fc'

function Template({ title, desc1, desc2, image, formtype, setIsLoggedIn }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-[1160px] grid grid-cols-1 lg:grid-cols-2 gap-10 py-10">

        {/* Left Section */}
        <div className="w-full max-w-[450px] mx-auto">
          <h1 className="text-richblack-5 font-semibold text-[1.75rem] sm:text-[1.875rem] leading-tight">
            {title}
          </h1>

          <p className="text-[1rem] sm:text-[1.125rem] mt-4 leading-relaxed">
            <span className="text-richblack-100">{desc1}</span>
            <br />
            <span className="text-blue-100 italic">{desc2}</span>
          </p>

          <div className="mt-6">
            {formtype === "signup"
              ? <SignupForm setIsLoggedIn={setIsLoggedIn} />
              : <LoginForm setIsLoggedIn={setIsLoggedIn} />
            }
          </div>

          {/* OR Divider */}
          <div className="flex items-center my-6 gap-x-2">
            <div className="h-[1px] w-full bg-richblack-700"></div>
            <p className="text-richblack-700 font-medium">OR</p>
            <div className="h-[1px] w-full bg-richblack-700"></div>
          </div>

          {/* Google Button */}
          <button className="w-full flex justify-center items-center rounded-lg font-medium text-richblack-100 border border-richblack-700 px-4 py-2 gap-x-2">
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>
        </div>

        {/* Right Section - Image (Hidden on Mobile) */}
        <div className="hidden lg:flex relative justify-center items-center">
          <img
            src={frameImage}
            alt="pattern"
            className="w-full max-w-[450px]"
            loading="lazy"
          />

          <img
            src={image}
            alt="students"
            className="absolute top-4 right-4 w-full max-w-[450px]"
            loading="lazy"
          />
        </div>

      </div>
    </div>
  )
}

export default Template

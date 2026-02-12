import React from 'react'
import { Link } from 'react-router-dom'

function CTAButton({ children, active, linkto }) {
  return (
    <Link to={linkto} className="w-full sm:w-auto">
      <div
        className={`
          flex items-center justify-center
          px-6 py-3 sm:px-8 sm:py-4
          rounded-md font-semibold
          text-sm sm:text-base
          transition-all duration-200
          ${active 
            ? "bg-yellow-50 text-black shadow-[0_4px_12px_rgba(255,215,0,0.3)] hover:bg-yellow-100" 
            : "bg-richblack-800 text-richblack-200 hover:bg-richblack-700"
          }
          hover:scale-95
          w-full sm:w-fit
        `}
      >
        {children}
      </div>
    </Link>
  )
}

export default CTAButton

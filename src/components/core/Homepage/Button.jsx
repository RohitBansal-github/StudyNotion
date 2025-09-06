import React from 'react';
import { Link } from 'react-router-dom';

function CTAButton({ children, active, linkto }) {
  return (
    <Link to={linkto}>
      <div
        className={`
          text-center p-5
          rounded-md font-bold 
          ${active ? "bg-yellow-50 text-black" : "bg-richblack-800 text-richblack-200"} 
          hover:scale-95 transition-all duration-200
          shadow-[0_0_5px_rgba(255,255,255,0.5)] 
          hover:shadow-[0_0_10px_rgba(255,255,255,0.5)] 
          w-fit
        `}
      >
        {children}
      </div>
    </Link>
  );
}

export default CTAButton;

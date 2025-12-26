import React from "react";
import { HiOutlineVideoCamera } from "react-icons/hi";

function CourseSubSectionAccordion({ subSec }) {
  return (
    <div className="border-b border-richblack-600 px-4 py-2 hover:bg-richblack-700 transition-colors rounded-md">
      <div className="flex items-center gap-3">
        <HiOutlineVideoCamera className="text-yellow-25" />
        <p className="text-richblack-5 font-medium">{subSec?.title}</p>
      </div>
    </div>
  );
}

export default CourseSubSectionAccordion;

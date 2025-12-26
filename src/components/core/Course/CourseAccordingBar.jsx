import { useEffect, useRef, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import CourseSubSectionAccordion from "./CourseSubSectionAccordion";

export default function CourseAccordionBar({ course, isActive, handleActive }) {
  const contentEl = useRef(null);

  const [active, setActive] = useState(false);
  const [sectionHeight, setSectionHeight] = useState(0);

  useEffect(() => {
    setActive(isActive?.includes(course._id));
  }, [isActive, course._id]);

  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0);
  }, [active]);

  return (
    <div className="overflow-hidden border border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0 rounded-lg">
      {/* Section Header */}
      <div
        className="flex cursor-pointer items-center justify-between bg-richblack-800 bg-opacity-20 px-7 py-5 transition-all duration-300"
        onClick={() => handleActive(course._id)}
      >
        <div className="flex items-center gap-3 font-semibold text-richblack-5">
          <AiOutlineDown
            className={`transition-transform duration-300 ${
              isActive.includes(course._id) ? "rotate-180" : "rotate-0"
            }`}
          />
          <p>{course?.sectionName}</p>
        </div>
        <span className="text-yellow-25 font-medium">
          {course.subSection.length} lecture(s)
        </span>
      </div>

      {/* Collapsible Content */}
      <div
        ref={contentEl}
        className="overflow-hidden bg-richblack-900 transition-[height] duration-300 ease-in-out"
        style={{ height: sectionHeight }}
      >
        <div className="flex flex-col gap-2 px-7 py-4">
          {course?.subSection?.map((subSec, i) => (
            <CourseSubSectionAccordion subSec={subSec} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

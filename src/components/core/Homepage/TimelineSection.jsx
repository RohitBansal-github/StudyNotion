import React from "react"

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"

import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
  {
    Logo: Logo1,
    heading: "Leadership",
    Description: "Fully committed to the success of the company",
  },
  {
    Logo: Logo2,
    heading: "Responsibility",
    Description: "Ownership-driven mindset with accountability",
  },
  {
    Logo: Logo3,
    heading: "Flexibility",
    Description: "Adapt fast to changing environments",
  },
  {
    Logo: Logo4,
    heading: "Problem Solving",
    Description: "Strategic thinking with practical execution",
  },
]

function TimelineSection() {
  return (
    <div className="w-full py-12">
      <div className="mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

        {/* ================= LEFT TIMELINE ================= */}
        <div className="w-full lg:w-[45%] flex flex-col gap-8">
          {timeline.map((element, index) => (
            <div key={index} className="flex gap-6">

              {/* Icon + Line */}
              <div className="flex flex-col items-center">
                <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-white shadow-md">
                  <img
                    src={element.Logo}
                    alt="timeline-logo"
                    className="w-6 h-6"
                  />
                </div>

                {index !== timeline.length - 1 && (
                  <div className="h-12 border-l-2 border-richblack-300 mt-2"></div>
                )}
              </div>

              {/* Text */}
              <div>
                <h3 className="text-lg font-semibold text-richblack-800">
                  {element.heading}
                </h3>
                <p className="text-richblack-600 text-sm leading-relaxed">
                  {element.Description}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* ================= RIGHT IMAGE ================= */}
        <div className="relative w-full lg:w-[55%] flex justify-center">
          <img
            src={timelineImage}
            alt="timeline"
            className="w-full max-w-[500px] rounded-xl shadow-lg"
          />

          {/* Stats Card */}
          <div
            className="
              absolute
              left-1/2 bottom-[-40px]
              -translate-x-1/2
              bg-caribbeangreen-700
              flex
              text-white
              rounded-xl
              shadow-xl
              overflow-hidden
            "
          >
            <div className="flex items-center gap-4 px-6 py-4 border-r border-caribbeangreen-300">
              <p className="text-3xl font-bold">10+</p>
              <p className="text-xs text-caribbeangreen-200 uppercase">
                Years Experience
              </p>
            </div>

            <div className="flex items-center gap-4 px-6 py-4">
              <p className="text-3xl font-bold">250+</p>
              <p className="text-xs text-caribbeangreen-200 uppercase">
                Courses
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default TimelineSection

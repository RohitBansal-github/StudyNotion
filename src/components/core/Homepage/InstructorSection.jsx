import React from "react";
import { useSelector } from "react-redux";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";

function InstructorSection() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const accountType = user?.accountType;

  const startTeachingLink =
    token && accountType === "Instructor"
      ? "/dashboard/my-profile"
      : "/signup";

  return (
    <div className="mt-24 px-4">
      <div className="flex flex-col-reverse lg:flex-row gap-14 items-center max-w-7xl mx-auto">
        {/* Left Image */}
        <div className="w-full lg:w-[50%] flex justify-center">
          <img
            src={Instructor}
            alt="Instructor"
            className="w-[90%] md:w-[75%] lg:w-full object-contain shadow-white"
          />
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-[50%] flex flex-col gap-6 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Become an {" "}
            <HighlightText text={"Instructor"} />
          </h2>

          <p className="font-medium text-base md:text-lg text-richblack-300 max-w-[500px] mx-auto lg:mx-0">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          <div className="flex justify-center lg:justify-start">
            <CTAButton active={true} linkto={startTeachingLink}>
              <div className="flex items-center gap-2">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorSection;
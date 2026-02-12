import React from "react";
import { useSelector } from "react-redux";
import HighlightText from "./HighlightText";
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lessions from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "./Button";

function LearningLanguageSection() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const accountType = user?.accountType;

  return (
    <div className="mt-24 md:mt-32 mb-24 md:mb-32 px-4">
      <div className="flex flex-col gap-6 items-center justify-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-center">
          Your Swiss knife for{" "}
          <HighlightText text={"learning any language"} />
        </h2>

        {/* Description */}
        <p className="text-center text-richblack-600 text-base md:text-lg font-medium max-w-[800px]">
          Using Spin makes learning multiple languages easy. With 20+ languages,
          realistic voice-over, progress tracking, custom schedules and more.
        </p>

        {/* Images */}
        <div className="flex flex-col md:flex-row items-center justify-center mt-10 gap-8 md:gap-12 lg:gap-16 xl:gap-0">
          <img
            src={know_your_progress}
            alt="Know your progress"
            className="object-contain w-[220px] sm:w-[240px] md:w-[200px] lg:w-[240px] xl:w-auto xl:-mr-32"
          />

          <img
            src={compare_with_others}
            alt="Compare with others"
            className="object-contain w-[220px] sm:w-[240px] md:w-[220px] lg:w-[260px] xl:w-auto z-10"
          />

          <img
            src={plan_your_lessions}
            alt="Plan your lessons"
            className="object-contain w-[220px] sm:w-[240px] md:w-[200px] lg:w-[240px] xl:w-auto xl:-ml-32"
          />
        </div>

        {/* CTA */}
        <div className="mt-10">
          <CTAButton active={true} linkto={"/about"}>
            Learn more
          </CTAButton>
        </div>
      </div>
    </div>
  );
}

export default LearningLanguageSection;

import React from "react";
import HighlightText from "../Homepage/HighlightText";
import CTAButton from "../Homepage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highliteText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {
  return (
    <div
      className="
        grid mx-auto 
        w-[90%] sm:w-[80%] md:w-[700px] lg:w-fit xl:w-fit 
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
        mb-12 mt-10 p-5 
      "
    >
      {LearningGridArray.map((card, i) => {
        return (
          <div
            key={i}
            className={`
              ${i === 0 && "xl:col-span-2 xl:h-[294px]"}  
              ${
                card.order % 2 === 1
                  ? "bg-richblack-700 h-[250px] sm:h-[260px] md:h-[280px] lg:h-[294px]"
                  : card.order % 2 === 0
                  ? "bg-richblack-800 h-[250px] sm:h-[260px] md:h-[280px] lg:h-[294px]"
                  : "bg-transparent"
              } 
              ${card.order === 3 && "xl:col-start-2"}  
            `}
          >
            {card.order < 0 ? (
              <div className="flex flex-col gap-3 pb-6 sm:pb-8 md:pb-10 xl:pb-0 xl:w-[90%]">
                <div className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                  {card.heading}
                  <HighlightText text={card.highliteText} />
                </div>
                <p className="text-richblack-300 font-medium text-sm sm:text-base">
                  {card.description}
                </p>

                <div className="w-fit mt-2">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6 md:gap-8">
                <h1 className="text-richblack-5 text-base sm:text-lg md:text-xl">
                  {card.heading}
                </h1>

                <p className="text-richblack-300 font-medium text-sm sm:text-base">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;

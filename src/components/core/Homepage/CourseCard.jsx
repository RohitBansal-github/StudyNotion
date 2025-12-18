import React from "react";
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  const isSelected = currentCard === cardData?.heading;

  return (
    <div
      className={`w-[280px] sm:w-[320px] lg:w-[360px] min-w-[280px] 
        ${isSelected ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50" : "bg-richblack-800"} 
        text-richblack-25 cursor-pointer rounded-lg transition-all duration-300 hover:scale-105`}
      onClick={() => setCurrentCard(cardData?.heading)}
    >
      {/* Main Content */}
      <div className="border-b-[2px] border-richblack-400 border-dashed p-5 flex flex-col gap-3 h-[70%]">
        <h3
          className={`text-[20px] font-semibold ${
            isSelected ? "text-richblack-800" : "text-white"
          }`}
        >
          {cardData?.heading}
        </h3>
        <p className="text-richblack-400 text-[14px]">{cardData?.description}</p>
      </div>

      {/* Footer Info */}
      <div
        className={`flex justify-between items-center px-5 py-3 text-[14px] font-medium ${
          isSelected ? "text-blue-300" : "text-richblack-300"
        }`}
      >
        <div className="flex items-center gap-2">
          <HiUsers className="text-lg" />
          <span>{cardData?.level}</span>
        </div>

        <div className="flex items-center gap-2">
          <ImTree className="text-lg" />
          <span>{cardData?.lessionNumber} Lessons</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

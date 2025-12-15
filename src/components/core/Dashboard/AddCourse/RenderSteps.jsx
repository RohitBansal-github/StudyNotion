import React from "react";
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import { FaCheck } from "react-icons/fa";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";

function RenderSteps() {
    const { step } = useSelector((state) => state.course);

    const steps = [
        { id: 1, title: "Course Information" },
        { id: 2, title: "Course Builder" },
        { id: 3, title: "Publish" },
    ];

    return (
        <div className="w-full mt-10">
            {/* ---------- TOP + TITLES TOGETHER IN GRID ---------- */}
            <div className="grid grid-cols-3 w-full">

                {steps.map((item, index) => (
                    <div key={item.id} className="flex flex-col items-center relative">

                        {/* Circle */}
                        <div
                            className={`w-10 h-10 flex items-center justify-center rounded-full border-2
          ${step === item.id
                                    ? "bg-yellow-900 border-yellow-50 text-yellow-50"
                                    : step > item.id
                                        ? "bg-yellow-50 text-black border-yellow-50"
                                        : "border-richblack-700 bg-richblack-800 text-richblack-300"
                                }
        `}
                        >
                            {step > item.id ? <FaCheck /> : item.id}
                        </div>

                        {/* Dashed line — only for col 1 & 2 */}
                        {index !== steps.length - 1 && (
                            <div className="absolute top-5 right-[-59%] w-full border-t-2 border-dashed border-richblack-600"></div>
                        )}

                        {/* Title under circle */}
                        <p className="mt-3 text-sm text-white text-center">{item.title}</p>

                    </div>
                ))}
            </div>


            {/* ---------- FORMS ---------- */}
            <div className="mt-10">
                {step === 1 && <CourseInformationForm />}
                {step === 2 && <CourseBuilderForm />}
                {/* {step === 3 && <PublishCourse />} */}
            </div>
        </div>
    );
}

export default RenderSteps;

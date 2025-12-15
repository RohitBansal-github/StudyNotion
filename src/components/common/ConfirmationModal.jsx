import React from "react";
import IconBtn from "./IconBtn";

function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-richblack-900 bg-opacity-60 backdrop-blur-sm z-50">
      <div className="w-11/12 max-w-md rounded-lg bg-richblack-800 p-6 shadow-lg border border-richblack-700">
        
        {/* Heading */}
        <p className="text-lg font-semibold text-richblack-5">
          {modalData.text1}
        </p>

        {/* Subtext */}
        <p className="mt-2 mb-6 text-sm text-richblack-300">
          {modalData.text2}
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-end">
          <IconBtn
            onClick={modalData?.btn1Handler}
            text={modalData?.btn1Text || "Confirm"}
            customClasses="bg-yellow-50 text-richblack-900 hover:bg-yellow-200 px-4 py-2 rounded-md"
          />
          <button
            onClick={modalData?.btn2Handler}
            className="px-4 py-2 rounded-md border border-richblack-600 text-richblack-300 hover:bg-richblack-700 transition"
          >
            {modalData?.btn2Text || "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;

import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { FiMenu, FiX } from "react-icons/fi"
import IconBtn from "../../common/IconBtn"

function VideoDetailsSidebar({ setReviewModal }) {
  const navigate = useNavigate()
  const { courseId } = useParams()

  const {
    courseSectionData = [],
    courseEntireData,
    completedLectures = [],
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse)

  const [activeSection, setActiveSection] = useState(null)
  const [activeVideo, setActiveVideo] = useState(null)

  // ✅ Mobile sidebar toggle
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <>
      {/* 🔹 Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-richblack-800 border-b border-richblack-700">
        <button
          onClick={() => setShowSidebar(true)}
          className="text-2xl text-white"
        >
          <FiMenu />
        </button>

        <p className="text-sm font-semibold truncate">
          {courseEntireData?.courseName}
        </p>
      </div>

      {/* 🔹 Sidebar */}
      <div
        className={`
          fixed lg:static top-0 left-0 z-40
          h-full w-[85%] sm:w-[380px] lg:w-full
          bg-richblack-800 flex flex-col
          transform transition-transform duration-300
          ${showSidebar ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-richblack-700">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate("/dashboard/enrolled-courses")}
              className="text-sm text-yellow-50"
            >
              ← Back
            </button>

            {/* Close on mobile */}
            <button
              className="lg:hidden text-xl"
              onClick={() => setShowSidebar(false)}
            >
              <FiX />
            </button>
          </div>

          <div className="mt-3 flex flex-col gap-2">
            <h2 className="font-semibold text-sm">
              {courseEntireData?.courseName}
            </h2>

            <p className="text-xs text-richblack-300">
              {completedLectures.length}/{totalNoOfLectures} Lectures
            </p>

            <IconBtn
              text="Add Review"
              onClick={() => {
                setReviewModal(true)
                setShowSidebar(false)
              }}
            />
          </div>
        </div>

        {/* Sections */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {courseSectionData.map((section) => (
            <div key={section._id}>
              <div
                className="cursor-pointer bg-richblack-700 px-4 py-2 rounded text-sm"
                onClick={() =>
                  setActiveSection(
                    activeSection === section._id ? null : section._id
                  )
                }
              >
                {section.sectionName}
              </div>

              {activeSection === section._id && (
                <div className="mt-2 space-y-1">
                  {section?.subSection?.map((video) => (
                    <div
                      key={video._id}
                      onClick={() => {
                        setActiveVideo(video._id)
                        setShowSidebar(false)
                        navigate(
                          `/view-course/${courseId}/section/${section._id}/sub-section/${video._id}`
                        )
                      }}
                      className={`px-4 py-2 rounded cursor-pointer text-xs sm:text-sm flex gap-2 items-center
                        ${
                          activeVideo === video._id
                            ? "bg-yellow-200 text-black"
                            : "bg-richblack-900"
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(video._id)}
                        readOnly
                      />
                      <span className="truncate">{video.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Overlay (Mobile) */}
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="fixed inset-0 bg-black bg-opacity-60 z-30 lg:hidden"
        />
      )}
    </>
  )
}

export default VideoDetailsSidebar

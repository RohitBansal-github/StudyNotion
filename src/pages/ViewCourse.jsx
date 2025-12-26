import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"

import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"

import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"

function ViewCourse() {
  const [reviewModal, setReviewModal] = useState(false)

  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!token || !courseId) return

    const fetchCourseDetails = async () => {
      try {
        const courseData = await getFullDetailsOfCourse(courseId, token)
        if (!courseData) return

        // ✅ API RESPONSE
        const { courseDetails, completedVideos } = courseData

        dispatch(setEntireCourseData(courseDetails))
        dispatch(setCourseSectionData(courseDetails?.courseContent || []))
        dispatch(setCompletedLectures(completedVideos || []))

        // ✅ TOTAL LECTURES
        let lectures = 0
        courseDetails?.courseContent?.forEach((section) => {
          lectures += section?.subSection?.length || 0
        })

        dispatch(setTotalNoOfLectures(lectures))
      } catch (error) {
        console.error("ViewCourse error:", error)
      }
    }

    fetchCourseDetails()
  }, [courseId, token, dispatch])

  return (
    <>
      <div className="flex min-h-screen bg-richblack-900 text-white">
        {/* Sidebar (Desktop fixed, Mobile handled internally) */}
        <div className="hidden lg:block w-[350px] border-r border-richblack-700">
          <VideoDetailsSidebar setReviewModal={setReviewModal} />
        </div>

        {/* Mobile Sidebar */}
        <div className="lg:hidden">
          <VideoDetailsSidebar setReviewModal={setReviewModal} />
        </div>

        {/* Video Content */}
        <div className="flex-1 p-3 sm:p-4 lg:p-8">
          <Outlet />
        </div>
      </div>

      {reviewModal && (
        <CourseReviewModal setReviewModal={setReviewModal} />
      )}
    </>
  )
}

export default ViewCourse

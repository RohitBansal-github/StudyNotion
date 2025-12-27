import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getInstructorData } from "../../../../services/operations/profileAPI"
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI"
import { Link } from "react-router-dom"
import InstructorChart from "./InstructorChart"

function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState([])
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const getCourseDataWithStats = async () => {
      setLoading(true)
      const instructorApiData = await getInstructorData(token)
      const result = await fetchInstructorCourses(token)

      if (instructorApiData?.length) setInstructorData(instructorApiData)
      if (result) setCourses(result)

      setLoading(false)
    }
    getCourseDataWithStats()
  }, [])

  const totalAmount = instructorData.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  )

  const totalStudents = instructorData.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  )

  return (
    <div className="p-6 text-richblack-5">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">
          Hi {user?.firstName} 👋
        </h1>
        <p className="text-richblack-300">
          Let’s start something new today
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="spinner"></div>
        </div>
      ) : courses.length > 0 ? (
        <div className="space-y-8">
          {/* Chart + Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-richblack-800 rounded-xl p-4">
              <InstructorChart courses={instructorData} />
            </div>

            <div className="bg-richblack-800 rounded-xl p-6 space-y-4">
              <p className="text-lg font-semibold">Statistics</p>

              <div className="flex justify-between text-richblack-200">
                <p>Total Courses</p>
                <p className="font-semibold">{courses.length}</p>
              </div>

              <div className="flex justify-between text-richblack-200">
                <p>Total Students</p>
                <p className="font-semibold">{totalStudents}</p>
              </div>

              <div className="flex justify-between text-richblack-200">
                <p>Total Earnings</p>
                <p className="font-semibold">₹ {totalAmount}</p>
              </div>
            </div>
          </div>

          {/* Courses */}
          <div className="bg-richblack-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-semibold">Your Courses</p>
              <Link
                to="/dashboard/my-courses"
                className="text-yellow-50 hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {courses.slice(0, 3).map((course) => (
                <div
                  key={course._id}
                  className="bg-richblack-700 rounded-lg overflow-hidden"
                >
                  <img
                    src={course.thumbnail}
                    alt="course thumbnail"
                    className="h-40 w-full object-cover"
                  />

                  <div className="p-4 space-y-2">
                    <p className="font-semibold">{course.courseName}</p>
                    <div className="flex text-sm text-richblack-300 gap-2">
                      <p>{course.studentsEnrolled.length} students</p>
                      <span>|</span>
                      <p>₹ {course.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-richblack-800 rounded-xl p-8 text-center">
          <p className="mb-4 text-richblack-300">
            You have not created any courses yet
          </p>
          <Link
            to="/dashboard/add-course"
            className="bg-yellow-50 text-black px-6 py-2 rounded-lg font-semibold"
          >
            Create a Course
          </Link>
        </div>
      )}
    </div>
  )
}

export default Instructor

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { deleteCourse, fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import { COURSE_STATUS } from "../../../../utils/constants";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

function CoursesTable({ courses, setCourses }) {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate = useNavigate();

  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    await deleteCourse({ courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) setCourses(result);
    setConfirmationModal(null);
    setLoading(false);
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table className="w-full border-collapse">
        {/* ===== TABLE HEADER ===== */}
        <Thead>
          <Tr className="border-b border-richblack-700 bg-richblack-700/50">
            <Th className="p-4 text-left text-sm font-semibold text-richblack-25">Course</Th>
            <Th className="p-4 text-left text-sm font-semibold text-richblack-25">Duration</Th>
            <Th className="p-4 text-left text-sm font-semibold text-richblack-25">Price</Th>
            <Th className="p-4 text-left text-sm font-semibold text-richblack-25">Actions</Th>
          </Tr>
        </Thead>

        {/* ===== TABLE BODY ===== */}
        <Tbody>
          {courses.length === 0 ? (
            <Tr>
              <Td colSpan={4} className="py-8 text-center text-richblack-300">
                No Courses Found
              </Td>
            </Tr>
          ) : (
            courses.map((course) => (
              <Tr key={course._id} className="border-b border-richblack-700 hover:bg-richblack-700/30 transition">
                {/* ===== COURSE INFO ===== */}
                <Td className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img src={course.thumbnail} alt="Course Thumbnail" className="h-20 w-full sm:w-36 rounded-lg object-cover" />
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-richblack-5">{course.courseName}</p>
                      <p className="text-sm text-richblack-300 line-clamp-2 max-w-xs">{course.courseDescription}</p>
                      <p className="text-xs mt-1">
                        Status: <span className={course.status === COURSE_STATUS.DRAFT ? "text-pink-400 font-medium" : "text-yellow-400 font-medium"}>
                          {course.status === COURSE_STATUS.DRAFT ? "Draft" : "Published"}
                        </span>
                      </p>
                    </div>
                  </div>
                </Td>

                {/* ===== DURATION ===== */}
                <Td className="p-4 text-richblack-300 text-sm">{course?.totalDuration || "—"}</Td>

                {/* ===== PRICE ===== */}
                <Td className="p-4 text-richblack-25 font-medium">₹ {course.price}</Td>

                {/* ===== ACTIONS ===== */}
                <Td className="p-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button disabled={loading} onClick={() => navigate(`/dashboard/edit-course/${course._id}`)} className="rounded-md bg-richblack-700 px-3 py-1.5 text-sm text-richblack-5 hover:bg-richblack-600 transition disabled:opacity-50">
                      Edit
                    </button>
                    <button disabled={loading} onClick={() => setConfirmationModal({
                      text1: "Delete this course?",
                      text2: "All the data related to this course will be permanently deleted.",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: !loading ? () => handleCourseDelete(course._id) : () => {},
                      btn2Handler: !loading ? () => setConfirmationModal(null) : () => {},
                    })} className="rounded-md bg-pink-600 px-3 py-1.5 text-sm text-white hover:bg-pink-700 transition disabled:opacity-50">
                      Delete
                    </button>
                  </div>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      {/* ===== CONFIRMATION MODAL ===== */}
      {confirmationModal && (
        <div className="relative z-[1000]">
          <ConfirmationModal modalData={confirmationModal} />
        </div>
      )}
    </div>
  );
}

export default CoursesTable;
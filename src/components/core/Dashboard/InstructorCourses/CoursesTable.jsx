import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { COURSE_STATUS } from '../../../../utils/constants';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

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
    <div>
      <Table className="w-full border-collapse">
        <Thead>
          <Tr className="border-b border-richblack-800">
            <Th className="p-4 text-left">Courses</Th>
            <Th className="p-4 text-left">Duration</Th>
            <Th className="p-4 text-left">Price</Th>
            <Th className="p-4 text-left">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses.length === 0 ? (
            <Tr>
              <Td colSpan={4} className="text-center py-4">
                No Courses Found
              </Td>
            </Tr>
          ) : (
            courses.map((course) => (
              <Tr key={course._id} className="border-b border-richblack-800">
                <Td className="p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={course.thumbnail}
                      alt="Course Thumbnail"
                      className="h-[100px] w-[160px] rounded-lg object-cover"
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold">{course.courseName}</p>
                      <p className="text-richblack-300">{course.courseDescription}</p>
                      <p className="text-sm">
                        Status:{" "}
                        <span
                          className={
                            course.status === COURSE_STATUS.DRAFT
                              ? 'text-pink-500'
                              : 'text-yellow-400'
                          }
                        >
                          {course.status === COURSE_STATUS.DRAFT ? 'DRAFTED' : 'PUBLISHED'}
                        </span>
                      </p>
                    </div>
                  </div>
                </Td>

                <Td className="p-4">2hr 30min</Td>
                <Td className="p-4">${course.price}</Td>

                <Td className="p-4 flex gap-2">
                  <button
                    disabled={loading}
                    onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                    className="rounded-md bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 disabled:opacity-50"
                  >
                    Edit
                  </button>
                  <button
                    disabled={loading}
                    onClick={() =>
                      setConfirmationModal({
                        text1: 'Do you want to delete this course?',
                        text2: 'All the data related to this course will be deleted',
                        btn1text: 'Delete',
                        btn2text: 'Cancel',
                        btn1Handler: !loading ? () => handleCourseDelete(course._id) : () => {},
                        btn2Handler: !loading ? () => setConfirmationModal(null) : () => {},
                      })
                    }
                    className="rounded-md bg-red-500 px-3 py-1 text-white hover:bg-red-600 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}

export default CoursesTable;

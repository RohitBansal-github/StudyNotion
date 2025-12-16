import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import { MdEdit } from 'react-icons/md'
import ConfirmationModal from '../../../common/ConfirmationModal';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../utils/constants';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { Navigate, useNavigate } from 'react-router-dom';

function CoursesTable({courses,setCourses}) {

    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth);
    const [loading, setLoading] = useState(false);
    const[confirmationModal, setConfirmationModal] = useState(false);

    const navigate = useNavigate();

    const handleCourseDelete=async(courseId)=>{
        setLoading(true);

        await deleteCourse({courseId: courseId}, token);

        const result = await fetchInstructorCourses(token);

        if(result){
            setCourses(result);
        }

        setConfirmationModal(null);
        setLoading(false);
    }



  return (
    <div>
        <Table>
            <Thead>
                <Tr className='flex gap-x-10 border-richblack-800 p-8'>
                    <Th>
                        Courses
                    </Th>
                    <Th>
                        Duration
                    </Th>
                    <Th>
                        Price
                    </Th>
                    <Th>
                        Actions
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    courses.length === 0 ? (
                        <Tr>
                            <Td>
                                No Courses Found
                            </Td>
                        </Tr>
                    )
                    :
                    (
                        courses?.map((course)=>(
                            <Tr key={course._id}
                            className='flex gap-x-10 border-richblack-800 p-8'
                            >
                                <Td className='flex gap-x-4'>
                                    <img
                                    src={course?.thumbnail}
                                    className='h-[150px] w-[220px] rounded-lg object-cover'
                                    alt='course thumbnail'
                                    />

                                    <div className='flex flex-col'>
                                        <p>
                                            {course.courseName}
                                        </p>
                                        <p>{course.courseDescription}</p>
                                        <p>Created: </p>
                                        {
                                            course.status === COURSE_STATUS.DRAFT ? (
                                                <p className='text-pink-50'>DRAFTED</p>
                                            ) : 
                                            (
                                                <p className='text-yellow-50'>PUBLISHED</p>
                                            )
                                        }

                                    </div>
                                </Td>

                                <Td>
                                    2hr 30min
                                </Td>

                                <Td>
                                    ${course.price}
                                </Td>

                                <Td>
                                    <button className='mr-[19px]'
                                    disabled={loading}
                                    onClick={()=>{
                                        navigate(`/dashboard/edit-course/${course._id}`)
                                    }}
                                    > 
                                        EDIT
                                    </button>

                                    <button
                                    disabled={loading}
                                    onClick={()=>{
                                        setConfirmationModal({
                                            text1:"Do you want to delete this course?",
                                            text2:"All the data related to this course will be deleted",
                                            btn1text:"Delete",
                                            btn2text:"Cancel",
                                            btn1Handler: !loading ? ()=>handleCourseDelete(course._id):()=>{},
                                            btn2Handler: !loading ? ()=>setConfirmationModal(null) : ()=>{},

                                        })
                                    }}
                                    >
                                        Delete

                                    </button>
                                </Td>

 

                            </Tr>
                        ))
                    )
                }
            </Tbody>
        </Table>

        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}


    </div>
  )
}

export default CoursesTable
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import IconBtn from '../../common/IconBtn';
import { IoIosAddCircle } from "react-icons/io";
import CoursesTable from './InstructorCourses/CoursesTable';

function MyCourses() {

    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const result = await fetchInstructorCourses(token);
            if (Array.isArray(result)) {
                setCourses(result); // ✅ correct for your API
            }
        }
        fetchCourses();
    }, [token])


    return (
        <div>
            <div className='flex justify-between'>
                <h1>My Courses</h1>
                <IconBtn
                    text="Add Course"
                    onClick={() => navigate("/dashboard/add-course")}
                >
                    <IoIosAddCircle />

                </IconBtn>
            </div>

            {courses && <CoursesTable courses={courses} setCourses={setCourses} />}


        </div>
    )
}

export default MyCourses
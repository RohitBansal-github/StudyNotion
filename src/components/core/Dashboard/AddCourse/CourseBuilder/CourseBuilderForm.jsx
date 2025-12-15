import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import IconBtn from '../../../../common/IconBtn';
import { GrAddCircle } from 'react-icons/gr';
import { BiRightArrow } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';

function CourseBuilderForm() {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const [editSectionName, setEditSectionName] = useState(null);

    const { course } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!course?._id) {
            toast.error("Course ID not found. Please save course first.");
        }
    }, [course?._id]);




    const onSubmit = async (data) => {

        if (!course?._id) return; // prevent API call if courseId is missing

        setLoading(true);
        let result;

        if (editSectionName) {
            // we are editing the section name
            result = await updateSection(
                {
                    sectionName: data.sectionName,
                    sectionId: editSectionName,
                    courseId: course._id,
                }, token
            )
        }
        else {
            console.log("Course ID being used for section:", course._id);
            console.log("Token:", token);
            result = await createSection({
                sectionName: data.sectionName,
                courseId: course._id,
            }, token)
        }

        // update values
        if (result) {
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("sectionName", "");
        }

        // loading false
        setLoading(false);
    }

    const cancelEdit = () => {
        setEditSectionName(null);
        setValue("sectionName", "");
    }

    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }

    const goToNext = () => {
        if (course.courseContent.length === 0) {
            toast.error("Please add atleast one Section");
            return;
        }

        if (course.courseContent.some((section) => section.subSection.length === 0)) {
            toast.error("Please add atleast one lecture in each section");
            return;
        }

        // if everything is good
        dispatch(setStep(3));
    }

    const handleChangedEditSectionName = (sectionId, sectionName) => {
        if (editSectionName === sectionId) {
            cancelEdit();
            return;
        }

        setEditSectionName(sectionId);
        setValue("sectionName", sectionName);
        
    }



    return (
        <div className='text-white rounded-lg p-6 bg-richblack-800'>
            <p>Course Builder</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="sectionName">Section name <sup>*</sup>
                    </label>
                    <input type="text"
                        id='sectionName'
                        placeholder='Add section name'
                        {...register("sectionName", { required: true })}
                        className='w-full text-black'
                    />
                    {
                        errors.sectionName && (
                            <span>Section Name is required
                            </span>
                        )
                    }
                </div>

                <div className='mt-10 flex'>
                    <IconBtn
                        type='submit'
                        text={editSectionName ? "Edit Section Name" : "Create Section"}
                        outline={true}
                    >
                        <GrAddCircle />
                    </IconBtn>

                    {editSectionName && (
                        <button
                            type='button'
                            onClick={cancelEdit}
                            className='text-sm text-richblack-300 underline ml-10'
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>


            </form>

            {course?.courseContent?.length > 0 &&
                (
                    <NestedView handleChangedEditSectionName={handleChangedEditSectionName} />
                )}

            <div className='flex justify-end gap-x-3 mt-10'>
                <button
                    onClick={goBack}
                    className='rounded-md cursor-pointer flex items-center'
                >
                    Back
                </button>
                <IconBtn
                    text={"Next"}
                    onClick={goToNext}
                >
                    <BiRightArrow />
                </IconBtn>
            </div>


        </div>
    )
}

export default CourseBuilderForm
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../../../../slices/courseSlice';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { RxCross1 } from "react-icons/rx"
import Upload from '../CourseInformation/Upload';
import IconBtn from '../../../../common/IconBtn';

function SubSectionModal({ modalData, sectionId, setModalData, add = false, view = false, edit = false }) {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        getValues,
    } = useForm();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);


    useEffect(() => {
        if (view || edit) {
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
        }
    }, [modalData, view, edit, setValue]);

    const isFormUpdated = () => {
        const currentValues = getValues();

        if (currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo instanceof File
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    const handleEditSubSection = async () => {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);

        if (currentValues.lectureTitle !== modalData.title) {
            formData.append("title", currentValues.lectureTitle);
        }

        if (currentValues.lectureDesc !== modalData.description) {
            formData.append("description", currentValues.lectureDesc);
        }

        if (currentValues.lectureVideo instanceof File) {
            formData.append("videoFile", currentValues.lectureVideo);
        }

        setLoading(true);

        const updatedSection = await updateSubSection(formData, token);

        if (updatedSection) {
            dispatch(
                setCourse({
                    ...course,
                    courseContent: course.courseContent.map((sec) =>
                        sec._id === modalData.sectionId ? updatedSection : sec
                    ),
                })
            );

            // ✅ close modal AFTER redux update
            setModalData(null);
        }

        setLoading(false);
    };


    const onSubmit = async (data) => {

        if (view) {
            return;
        }

        if (edit) {
            if (!isFormUpdated()) {
                toast.error("No changes made to the form")
            }
            else {
                //edit kardo
                handleEditSubSection();
            }
            return;
        }

        const formData = new FormData();
        formData.append("sectionId", modalData);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDesc);
        formData.append("videoFile", data.lectureVideo);
        formData.append("timeDuration", data.timeDuration);
        setLoading(true);

        // API CALL
        const result = await createSubSection(formData, token);

        if (result) {
            // TODO: check for updation

            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData
                    ? result   // updatedSection from backend
                    : section
            )

            dispatch(setCourse({
                ...course,
                courseContent: updatedCourseContent
            }))

        }

        setModalData(null);
        setLoading(false);


    }


    return (
        <div>

            <div>
                <div>
                    <p>
                        {view && "Viewing "}
                        {add && "Adding "}
                        {edit && "Editing "}
                        Lecture

                    </p>
                    <button onClick={() => !loading && setModalData(null)}>
                        <RxCross1 />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Upload
                        name="lectureVideo"
                        label="Lecture Video"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        video={true}
                        viewData={view ? modalData.videoUrl : null}
                        editData={edit ? modalData.videoUrl : null}
                    />

                    <div>
                        <label htmlFor="lectureTitle">Lecture Title</label>
                        <input
                            id='lectureTitle'
                            placeholder='Enter Lecture Title'
                            {...register("lectureTitle", { required: true })}
                            className='w-full text-white bg-richblack-800 p-2 rounded-md'
                        />
                        {errors.lectureTitle && (<span>
                            Lecture Title is required
                        </span>)}
                    </div>
                    <div>
                        <label htmlFor="">Lecture Description</label>
                        <textarea name="" id="lectureDesc"
                            placeholder='Enter Lecture Description'
                            {...register("lectureDesc", { required: true })}
                            className='w-full min-h-[130px] text-white bg-richblack-800 p-2 rounded-md'
                        />
                        {
                            errors.lectureDesc && (<span>
                                Lecture Description is required
                            </span>)
                        }

                    </div>

                    {
                        !view && (
                            <div>
                                <IconBtn
                                    type='submit'
                                    text={loading ? "Loading..." : edit ? "Save Changes" : "Save"} />

                            </div>
                        )
                    }


                </form>
            </div>


        </div>
    )
}

export default SubSectionModal
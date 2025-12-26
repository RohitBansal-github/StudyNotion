import React from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import ReactStars from "react-rating-stars-component"
import IconBtn from "../../common/IconBtn"
import { createRating } from "../../../services/operations/courseDetailsAPI"

function CourseReviewModal({ setReviewModal }) {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const { courseEntireData } = useSelector((state) => state.viewCourse)
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const res = await createRating(
            {
                rating: data.rating,
                review: data.review,
                courseId: courseEntireData._id,
            },
            token
        )
        console.log("rating res:", res);
        setReviewModal(false)
    }

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 text-white">
            <div className="bg-richblack-800 w-full max-w-lg p-6 rounded-lg">
                <div className="flex justify-between items-center border-b border-richblack-600 pb-2">
                    <h2 className="font-semibold">Add Review</h2>
                    <button onClick={() => setReviewModal(false)}>✕</button>
                </div>

                <div className="flex items-center gap-3 mt-4">
                    <img
                        src={user?.image}
                        alt="user"
                        className="w-10 h-10 rounded-full"
                    />
                    <p>{user?.firstName} {user?.lastName}</p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-4 space-y-4"
                >
                    <ReactStars
                        count={5}
                        onChange={(val) => setValue("rating", val)}
                        activeColor="#ffd700"
                    />
                    <input type="hidden" {...register("rating", { required: true })} />

                    <textarea
                        {...register("review", { required: true })}
                        placeholder="Write your experience..."
                        className="w-full bg-richblack-700 p-3 rounded"
                    />

                    {errors.review && (
                        <p className="text-sm text-pink-400">
                            Review is required
                        </p>
                    )}

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            className="blackButton"
                            onClick={() => setReviewModal(false)}
                        >
                            Cancel
                        </button>
                        <IconBtn text="Submit"
                            type="submit"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CourseReviewModal

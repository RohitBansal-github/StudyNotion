import React, { useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri';
import ReactStars from "react-rating-stars-component";
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../../../slices/cartSlice';


function RenderCartCourses() {

    const { cart } = useState((state) => state.cart);
    const dispatch = useDispatch();


    return (
        <div>
            {
                cart.map((course, index) => (
                    <div>
                        <div>
                            <img src={course?.thumbnail} alt="" />
                            <div>
                                <p>{course?.courseName}</p>
                                <p>
                                    {course?.category.name}
                                </p>
                                <div>
                                    {/* to do average rating here */}
                                    <span>4.8</span>
                                    <ReactStars
                                        count={5}
                                        size={20}
                                        edit={false}
                                        activeColor="#ffd700"
                                        emptyIcon={<i className="far fa-star"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        full
                                    />

                                    <span>
                                        {course?.ratingAndReview?.length}
                                        Ratings
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button onClick={()=>dispatch(removeFromCart(course._id))}>
                                <RiDeleteBin6Line/>
                                <span>Remove</span>
                            </button>

                            <p>Rs {course?.price}</p>
                        </div>


                    </div>

                ))
            }
        </div>
    )
}

export default RenderCartCourses
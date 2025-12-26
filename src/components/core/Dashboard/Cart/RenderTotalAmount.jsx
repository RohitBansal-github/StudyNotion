import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';
import { buyCourse } from '../../../../services/operations/studentFeaturesAPI';
import { useNavigate, useParams } from 'react-router-dom';

function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart);
  const {token} = useSelector((state)=>state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    console.log("Bought these course:", courses);
    // TODO: payment gateway integration


    if (token) {
          buyCourse(token, courses, user, navigate, dispatch);
          return;
        }

  }

  return (
    <div className="rounded-lg border border-richblack-700 bg-richblack-800 p-6">
      
      <p className="mb-1 text-sm text-richblack-300">
        Total Amount
      </p>

      <p className="mb-6 text-3xl font-semibold text-yellow-100">
        ₹ {total}
      </p>

      <IconBtn
        text="Buy Now"
        onClick={handleBuyCourse}
        customClasses="w-full justify-center bg-yellow-50 text-richblack-900 hover:bg-yellow-100"
      />

      <p className="mt-4 text-center text-xs text-richblack-400">
        Secure Checkout • 100% Safe Payments
      </p>
    </div>
  )
}

export default RenderTotalAmount

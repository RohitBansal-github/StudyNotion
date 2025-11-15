import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sendOtp } from "../../../services/operations/authAPI"
import { setSignupData } from "../../../slices/authSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"
// import Tab from "../../common/Tab"

function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // student or instructor
  const [accountType, setaccountType] = useState(ACCOUNT_TYPE.STUDENT)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setshowPassword] = useState(false)
  const [showConfirmPassword, setshowConfirmPassword] = useState(false)

  const { firstName, lastName, email, password, confirmPassword } = formData

  // Handle input fields, when some value changes
  const changeHandler = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  // Handle Form Submission
  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    const signupData = {
      ...formData,
      accountType,
    }

    // Setting signup data to state
    // To be used after otp verification
    console.log("Signup Data -> ", signupData)

    dispatch(setSignupData(signupData))
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate))

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setaccountType(ACCOUNT_TYPE.STUDENT)
  }

//   // data to pass to Tab component
//   const tabData = [
//     {
//       id: 1,
//       tabName: "Student",
//       type: ACCOUNT_TYPE.STUDENT,
//     },
//     {
//       id: 2,
//       tabName: "Instructor",
//       type: ACCOUNT_TYPE.INSTRUCTOR,
//     },
//   ]

  return (
        <div className='w-full overflow-hidden'>
            {/* Student / Instructor Tab */}
            <div className='flex bg-richblack-800 p-1 gap-x-1 my-5 rounded-full max-w-max'>
                <button
                    className={`${accountType===ACCOUNT_TYPE.STUDENT? "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
                    onClick={() => setaccountType(ACCOUNT_TYPE.STUDENT)}
                >
                    Student
                </button>
                <button
                    className={`${accountType === ACCOUNT_TYPE.INSTRUCTOR ? "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
                    onClick={() => setaccountType(ACCOUNT_TYPE.INSTRUCTOR)}
                >
                    Instructor
                </button>
            </div>

            <form onSubmit={submitHandler} className='flex flex-col w-full gap-y-4 overflow-hidden'>
                {/* First & Last Name */}
                <div className='flex w-full gap-x-4 mt-[10px]'>
                    <label className='w-full'>
                        <p className='text-[0.875] text-richblack-5 mb-1 leading-[1.375rem]'>First Name<sup className='text-pink-200'>*</sup></p>
                        <input
                            type="text"
                            name="firstName"
                            onChange={changeHandler}
                            value={firstName}
                            placeholder='Enter first name'
                            required
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                    </label>
                    <label className='w-full'>
                        <p className='text-[0.875] text-richblack-5 mb-1 leading-[1.375rem]'>Last Name<sup className='text-pink-200'>*</sup></p>
                        <input
                            type="text"
                            name="lastName"
                            onChange={changeHandler}
                            value={lastName}
                            placeholder='Enter last name'
                            required
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                    </label>
                </div>

                {/* Email */}
                <label className='w-full mt-[10px]'>
                    <p className='text-[0.875] text-richblack-5 mb-1 leading-[1.375rem]'>Email<sup className='text-pink-200'>*</sup></p>
                    <input
                        type="email"
                        name="email"
                        onChange={changeHandler}
                        value={email}
                        placeholder='Enter email Address'
                        required
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                    />
                </label >

                {/* Passwords */}
                <div className='flex w-full gap-x-4 mt-[10px]'>
                    <label className='w-full relative'>
                        <p className='text-[0.875] text-richblack-5 mb-1 leading-[1.375rem]'>Create Password<sup className='text-pink-200'>*</sup></p>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            onChange={changeHandler}
                            value={formData.password}
                            placeholder='Enter password'
                            required
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                        <span
                            className='absolute right-3 top-[38px] cursor-pointer'
                            onClick={() => setshowPassword((prev) => !prev)}
                        >
                            {showPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />
                            ) : (
                                <AiOutlineEye fontSize={24} fill='#AFB2BF' />
                            )}
                        </span>
                    </label>

                    <label className='w-full relative'>
                        <p className='text-[0.875] text-richblack-5 mb-1 leading-[1.375rem]'>Confirm Password<sup className='text-pink-200'>*</sup></p>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            onChange={changeHandler}
                            value={formData.confirmPassword}
                            placeholder='Confirm password'
                            required
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                        <span
                            className='absolute right-3 top-[38px] cursor-pointer '
                            onClick={() => setshowConfirmPassword((prev) => !prev)}
                        >
                            {showConfirmPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />
                            ) : (
                                <AiOutlineEye fontSize={24} fill='#AFB2BF' />
                            )}
                        </span>
                    </label>
                </div>

                <button type='submit' className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-2'>
                    Create Account
                </button>
            </form>
        </div>
    )
}

export default SignupForm

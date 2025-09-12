import React, { useState } from 'react'
// import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import {login} from "../../../services/operations/authAPI"

function LoginForm({ setIsLoggedIn }) {
    const [formData, setformData] = useState({ email: "", password: "" })

    const [showPassword, setshowPassword] = useState(false);
    const dispatch=useDispatch();

    const navigate = useNavigate();

    function changeHandler(event) {

        setformData((prevData) => (
            {
                ...prevData, [event.target.name]: event.target.value
            }
        ))

    }

    const {email,password}=formData;


    function submitHandler(e) {
        e.preventDefault();
        setIsLoggedIn(true);
        // toast.success("Logged In");
        // console.log('printing the form data')
        // console.log(formData)
        // Navigate('/dashboard');
        dispatch(login(email,password,navigate))
    }
    

    return (
        <form onSubmit={submitHandler}
            className='flex flex-col w-full gap-y-4 mt-6'
        >
            <label className='w-full'>
                <p className='text-[0.875] text-richblack-5 mb-1 leading-[1.375rem]'>
                    Email Address<sup className='text-pink-200'>*</sup>
                </p>
                <input
                    type="email"

                    name="email"
                    value={formData.email}
                    onChange={changeHandler}
                    placeholder='Enter email address'
                    required

                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                />

            </label>
            <label className='relative w-full'>
                <p className='text-[0.875] text-richblack-5 mb-1 leading-[1.375rem]
                relative'>
                    password<sup className='text-pink-200'>*</sup>
                </p>
                <input
                    type={showPassword ?
                        ("text") : ("password")
                    }
                    name="password"
                    value={formData.password}
                    onChange={changeHandler}
                    placeholder='Enter password'
                    required

                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'

                />

                <span

                    className='absolute right-3 top-[38px] cursor-pointer'

                    onClick={() => setshowPassword((prev) => !prev)}

                >{showPassword ? (<AiOutlineEyeInvisible
                        fontSize={24} fill='#AFB2BF'
                    />) : (<AiOutlineEye
                    fontSize={24} fill='#AFB2BF'
                />)}</span>

                <Link to="/forgot-password">
                    <p className='text-xs mt-1 text-blue-100 max-w-max ml-auto'>
                        forgot Password
                    </p>
                </Link>

            </label>

            <button type="submit"
            className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6 ' 
            >
                Sign In
            </button>
        </form >
    )
}

export default LoginForm
import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { sendOtp, signUp } from '../services/operations/authAPI';

function VerifyEmail() {

    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { signupData, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!signupData) {
            navigate("/signup");
        }
    }, [navigate, signupData]);

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;

        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-richblack-900 text-white">
            {
                !loading ? (
                    <div className="bg-richblack-800 p-8 rounded-xl shadow-md w-full max-w-md text-center">
                        <h1 className="text-2xl font-semibold mb-2">Verify Email</h1>
                        <p className="text-sm text-gray-400 mb-6">
                            A verification code has been sent to your email. Enter the code below:
                        </p>

                        <form onSubmit={handleOnSubmit} className="space-y-6">
                            <div className="flex justify-center">
                                <OTPInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span className="mx-1"></span>}
                                    renderInput={(props) => (
                                        <input
                                            {...props}
                                            className="bg-richblack-700 border border-gray-600 rounded-md w-10 h-10 text-center text-white focus:outline-none"
                                        />
                                    )}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 rounded-lg transition"
                            >
                                Verify Email
                            </button>
                        </form>

                        <div className="mt-6 space-y-3">
                            <Link to="/login" className="block text-sm text-gray-400 hover:underline">
                                Back to Login
                            </Link>

                            <button
                                onClick={() => dispatch(sendOtp(signupData.email, navigate))}
                                className="text-sm text-gray-400 hover:underline"
                            >
                                Resend it
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">Loading...</div>
                )
            }
        </div>
    )
}

export default VerifyEmail

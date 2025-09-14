import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import CountryCode from '../../data/countrycode.json'

function ContactUsForm() {

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm();

  const submitContactForm = async (data) => {
    console.log("Logging Data", data);

    try {
      setLoading(true);
      const response = { status: "ok" };
      console.log("Logging response", response);
      setLoading(false);
    }
    catch (error) {
      console.log("Error", error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful]);

  // Common input classes
  const inputClasses =
    "w-full text-white rounded-md p-2 bg-richblack-800 border-b-2 border-richblack-700 placeholder-gray-400";

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>

      <div className="flex flex-col gap-5 text-white">

        {/* first + last name */}
        <div className="flex gap-5">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              placeholder="Enter First name"
              {...register("firstname", { required: true })}
              className={inputClasses}
            />
            {errors.firstname && (
              <span>Please enter Your first name</span>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              placeholder="Enter Last name"
              {...register("lastname")}
              className={inputClasses}
            />
          </div>
        </div>

        {/* email */}
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email Address"
            {...register("email", { required: true })}
            className={inputClasses}
          />
          {errors.email && (
            <span>Please enter your email address</span>
          )}
        </div>

        {/* phone number */}
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="phonenumber">Phone Number</label>

          <div className="flex gap-5">
            {/* dropdown */}
            <div className="w-[15%]">
              <select
                id="dropdown"
                {...register("countrycode", { required: true })}
                className={`${inputClasses} text-white w-fit`}
              >
                {CountryCode.map((element, index) => (
                  <option
                    key={index}
                    value={element.code}
                    className="bg-pure-greys-700
                    text-white"
                  >
                    {element.code}  - {element.country}
                  </option>
                ))}
              </select>
            </div>

            {/* phone input */}
            <div className="w-[80%]">
              <input
                type="number"
                id="phonenumber"
                placeholder="12345 67890"
                  className="w-full text-white rounded-md p-2 bg-richblack-800 border-b-2 border-richblack-700 placeholder-gray-400 
             [appearance:textfield] 
             [&::-webkit-inner-spin-button]:appearance-none 
             [&::-webkit-outer-spin-button]:appearance-none"
                {...register("phoneNo", {
                  required: { value: true, message: "Please enter Phone Number" },
                  maxLength: { value: 10, message: "Invalid Phone Number" },
                  minLength: { value: 8, message: "Invalid Phone Number" }
                })}
              />
            </div>
          </div>

          {errors.phoneNo && (
            <span>{errors.phoneNo.message}</span>
          )}
        </div>

        {/* message */}
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            placeholder="Enter your message here"
            {...register("message", { required: true })}
            className={`${inputClasses} h-32 resize-none`}
          />
          {errors.message && (
            <span>Please Enter your message.</span>
          )}
        </div>

        {/* button */}
        <button
          type="submit"
          className="rounded-md text-center bg-yellow-50 px-6 py-2 text-[16px] font-bold text-richblack-900 w-full"
        >
          Send Message
        </button>
      </div>

    </form>
  )
}

export default ContactUsForm

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

  const inputClasses =
    "w-full text-white rounded-md p-2 bg-richblack-800 border-b-2 border-richblack-700 placeholder-gray-400";

  return (
    <form onSubmit={handleSubmit(submitContactForm)} className="space-y-6">
      {/* Name fields */}
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex flex-col w-full">
          <label htmlFor="firstname">
            First Name <sup className="text-red-500">*</sup>
          </label>
          <input
            type="text"
            id="firstname"
            placeholder="Enter First Name"
            {...register("firstname", { required: "First name is required" })}
            className={inputClasses}
          />
          {errors.firstname && <span className="text-red-500">{errors.firstname.message}</span>}
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            placeholder="Enter Last Name"
            {...register("lastname")}
            className={inputClasses}
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col w-full">
        {/* Email */}
        <label htmlFor="email">
          Email Address <sup className="text-red-500">*</sup>
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter Email Address"
          {...register("email", { required: "Email is required" })}
          className={inputClasses}
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </div>

      {/* Phone */}
      <div className="flex flex-col w-full">
        <label htmlFor="phonenumber">
          Phone Number <sup className="text-red-500">*</sup>
        </label>
        <div className="flex gap-3">
          <select
            {...register("countrycode", { required: true })}
            className={`${inputClasses} w-[30%] text-white`}
          >
            {CountryCode.map((c, i) => (
              <option key={i} value={c.code} className="bg-richblack-700 text-white">
                {c.code} - {c.country}
              </option>
            ))}
          </select>
          <input
            type="number"
            id="phonenumber"
            placeholder="12345 67890"
            {...register("phoneNo", {
              required: "Phone number is required",
              minLength: { value: 8, message: "Invalid phone number" },
              maxLength: { value: 10, message: "Invalid phone number" }
            })}
            className={`${inputClasses} w-[70%] appearance-none`}
          />
        </div>
        {errors.phoneNo && <span className="text-red-500">{errors.phoneNo.message}</span>}
      </div>

      {/* Message */}
      <div className="flex flex-col w-full">
        <label htmlFor="message">
          Message <sup className="text-red-500">*</sup>
        </label>
        <textarea
          id="message"
          placeholder="Enter your message here"
          {...register("message", { required: "Message is required" })}
          className={`${inputClasses} h-32 resize-none`}
        />
        {errors.message && <span className="text-red-500">{errors.message.message}</span>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-yellow-50 text-richblack-900 font-bold py-3 rounded-md hover:bg-yellow-100 transition-all"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  )
}

export default ContactUsForm

import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

function ContactFormSection() {
  return (
    <div className="mx-auto flex flex-col items-center justify-center gap-5 py-10 px-6">
      <h1 className="text-3xl md:text-3xl font-bold text-center bg-richblack-800 px-6 py-4 rounded-full">
        Get in Touch
      </h1>
      <p className="text-richblack-200 text-base md:text-lg text-center max-w-2xl">
        We’d love to hear from you! Please fill out this form.
      </p>
      <ContactUsForm />
    </div>
  )
}

export default ContactFormSection

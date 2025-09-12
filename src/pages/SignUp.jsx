import React from 'react'
import signupImg from "../assets/Images/signup.webp"
import Template from '../components/core/Auth/Template'


function Signup({setIsLoggedIn}) {
  return (
    <Template
    title="join the millions learning to code with StudyNotion for free"
    desc1="Build skills for today, tommorow, and beyond."
    desc2="Education to Future-proof your career."
    image={signupImg}
    formtype="signup"
    setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Signup
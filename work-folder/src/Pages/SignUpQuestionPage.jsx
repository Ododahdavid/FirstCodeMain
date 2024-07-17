import React from 'react'
import { Link as RouteLink } from "react-router-dom"
import { Helmet } from "react-helmet";




const SignUpQuestionPage = () => {
  return (
    <>

      <Helmet>
        <title>FirstCode | SignUp Options</title>
      </Helmet>
      

      {/* Helmet section */}


        <h1 className={"SignUp-Question"}>You are Signing up as?</h1>

        <div className={"SignUp-OptionsContainer"}>

            <RouteLink  className={"Student-SignUpOption"} to={"/studentsignupformpage"}>

                <div className={"StudentSignUpOption-Image"}></div>
                <h3>Sign Up as a <span>Student</span></h3>

                
            </RouteLink>
            
            <RouteLink className={"Tutor-SignUpOption"} to={"/tutorsignupformpage"}>

                <div className={"TutorSignUpOption-Image"}></div>
                <h3>Sign Up as a <span>Tutor</span></h3>

            </RouteLink>

        </div>
    </>
  )
}

export default SignUpQuestionPage
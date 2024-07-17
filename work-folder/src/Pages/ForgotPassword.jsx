import React, { useState } from 'react'
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import ButtonLoader from "../Loader/ButtonLoader";
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {

    const [submitClick, setSubmitClick] = useState(false)

    const navigate = useNavigate()

    const [forgotPasswordEmail, setForgotPasswordEmail] = useState({
        email: ""
    })

    
    const handleInputValueChange = (event) => {
        event.preventDefault()
        const {name, value} = event.target
        setForgotPasswordEmail({...forgotPasswordEmail, [name]: value})
    }
    
    const handleSubmitClick = async (event) => {
        event.preventDefault();
        setSubmitClick(true);

        try{

            const response = await fetch('http://127.0.0.1:7000/api/v1/user/tutor/new/password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(forgotPasswordEmail),
            });

            if (response.ok) {
                toast.success("Email sent Successfully", {
                    style: {
                        background: "rgb(144, 234, 96)",
                    },
                });
                setSubmitClick(false)

                setTimeout(()=>{
                    navigate("/tutorresetpasswordpage")
                }, 2000)

            } else {
                // Handle error
                const errorData = await response.json();
                console.error('error', errorData);
                setSubmitClick(false)
                const errorMessage = errorData.message || "email failed"; // Adjust based on the actual error structure
                toast.error(errorMessage, {
                    style: {
                        background: "rgb(255, 139, 139)",
                    },
                });
            }

        }
        catch(error){
            toast.error("Failed to send email. Please try again later.")
            setSubmitClick(false)
            
        }
        
    }


  return (
    <>
          <Helmet>
                <title>FirstCode | Forgot Password</title>
            </Helmet>

            <section className="StudentSignUpformSection">
                {/* <div className={"StudentSignUpForm-image-container"}>
                    <div className={"TutorSignUpForm-image"}></div>
                </div> */}

                <div className={"StudentSignUpForm-Container"}>
                    <div className={"Form-LogoContainer"}>
                        <div className="Formlogo">
                            <svg
                                width={43}
                                height={43}
                                fill="none"
                                stroke="#1d3fed"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M7.5 17.25 1.5 12 6 6.75" />
                                <path d="m16.5 17.25 6-5.25-6-5.25" />
                                <path d="m14.25 4.5-4.5 15" />
                            </svg>

                            <h2>First Code</h2>
                        </div>
                    </div>

                    <h1 style={{ color: "rgb(255, 153, 0)", fontSize: "30px" }}>Forgot Password ?</h1>
                            <p style={{textAlign: "center", width: "500px"}}>A code will be sent to your email that enables you to reset your password. This code is only valid for 10 minutes</p>

                    {/* LOG IN FORM */}
                    <form onSubmit={handleSubmitClick}>
                        <label>
                            E-mail:
                            <input
                                type="email"
                                name="email"
                                value={forgotPasswordEmail.email}
                                onChange={handleInputValueChange}
                                />
                        </label>
                       

                        <div className={"sign-upButtonContainer"}>
                            <button
                                type="submit"
                                disabled={submitClick}
                                >
                                {submitClick ? <ButtonLoader /> : "Submit"}
                            </button>
                        </div>
                    </form>
                                
                </div>

                {/* Adding the toaster styling here */}
                <Toaster position="top-center" reverseOrder={false} />
            </section>
    </>
  )
}

export default ForgotPassword
import React, { useState } from 'react'
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import ButtonLoader from "../Loader/ButtonLoader";
import { useNavigate } from 'react-router-dom';


const PasswordReset = () => {

    const [submitClick, setSubmitClick] = useState(false)
    const navigate = useNavigate()

        const [resetPasswordDetails, setResetPasswordDetails] = useState({
            email: "",
            token:"",
            newPassword: ""
        })

        const handleInputValueChange = (event) =>{
            event.preventDefault();
            const { name, value } = event.target;
            setResetPasswordDetails({...resetPasswordDetails, [name]: value });
        }

        const handleSubmitClick = async (event) => {
            event.preventDefault();
            setSubmitClick(true);
    
            try{
    
                const response = await fetch('http://127.0.0.1:7000/api/v1/user/tutor/reset/password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(resetPasswordDetails),
                });
    
                if (response.ok) {
                    toast.success("Password changed Successfully", {
                        style: {
                            background: "rgb(144, 234, 96)",
                        },
                    });
                    setSubmitClick(false)

                    setTimeout(()=>{
                        navigate("/loginformpage")
                    }, 2000)
    
                } else {
                    // Handle error
                    const errorData = await response.json();
                    console.error('error', errorData);
                    setSubmitClick(false)
                    const errorMessage = errorData.message || "operation failed"; // Adjust based on the actual error structure
                    toast.error(errorMessage, {
                        style: {
                            background: "rgb(255, 139, 139)",
                        },
                    });
                }
    
            }
            catch(error){
                toast.error("Failed to change password. Please try again later.")
            }
        }

    return (
        <>

<Helmet>
                <title>FirstCode | Forgot Password</title>
            </Helmet>

            <section className="StudentSignUpformSection">


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

                    <h1 style={{ color: "rgb(255, 153, 0)", fontSize: "30px" }}>Reset Password </h1>

                    {/* LOG IN FORM */}
                    <form onSubmit={handleSubmitClick}>
                        <label>
                            E-mail:
                            <input
                                type="email"
                                name="email"
                                value={resetPasswordDetails.email}
                                onChange={handleInputValueChange}
                                />
                        </label>
                        <br />
                        <label>
                            Token:
                            <input
                                type="text"
                                name="token"
                                value={resetPasswordDetails.token}
                                onChange={handleInputValueChange}
                            />
                        </label>

                        <br />

                        <label>
                            New Password:
                            <input
                                type="password"
                                name="newPassword"
                                value={resetPasswordDetails.newPassword}
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

export default PasswordReset
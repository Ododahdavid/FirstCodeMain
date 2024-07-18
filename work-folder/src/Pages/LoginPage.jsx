import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { AppContext } from "../GeneralComponents/ContextApi";
import ButtonLoader from "../Loader/ButtonLoader";
import { Link as RouteLink } from "react-router-dom"

const LoginPage = () => {

    const [submitClick, setSubmitClick] = useState(false)

    const [loginDetails, setLoginDetails] = useState({
        email: "",
        role: "",
        password: ""
    })

    // const [submitClick, setSubmitClick] = useState(false);
    const navigate = useNavigate();

    //  This function handles Input Value change in the email field, and the roles field 
    const handleInputValueChange = (event) => {
        // destructuring the name and value fields for updating the login details state
        const { name, value } = event.target;
        setLoginDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };
    //   Function to handle chaneg of password on the input field, to update the password field in the Login Details state.
    const handlePasswordChange = (e) => {
        const { value } = e.target;
        setLoginDetails(prevDetails => ({
            ...prevDetails,
            password: value
        }));
    };

    const fieldValidator = () => {
        if (loginDetails.email === "" || loginDetails.password === "" || loginDetails.role === "") {
            toast.error("All fields are required", {
                style: {
                    background: "rgb(255, 139, 139)",
                },
            });
            return false;
        }
        return true;
    }

    const handleSubmitClick = async (event) => {
        event.preventDefault();
        setSubmitClick(true);

        if (fieldValidator()) {
            if (loginDetails.role === "Tutor") {
                try {
                    const loginResponse = await fetch('http://127.0.0.1:7000/api/v1/user/login/tutor', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(loginDetails),
                    });

                    if (loginResponse.ok) {
                        localStorage.removeItem("token") // removes previous stored token incase the user does not log out before ;ogging into another account on the same device 
                        localStorage.removeItem('tutorData'); // added this line just incase the user does not log out, and logs in another user, it will remove the previos saved details in the localStorage... so it will not coflict each other

                        toast.success("Login Successful", {
                            style: {
                                background: "rgb(144, 234, 96)",
                            },
                        });
                        setSubmitClick(false)
                        const loginData = await loginResponse.json();
                        localStorage.setItem("tutorData", JSON.stringify(loginData))
                        localStorage.setItem('token', loginData.token);

                        // Navigate to the Tutor dashboard page after successful login
                        setTimeout(() => {
                            navigate("/tutordashboard")
                        }, 2000);

                    } else {
                        // Handle error
                        const errorData = await loginResponse.json();
                        console.error('Login failed:', errorData);
                        setSubmitClick(false)
                        const errorMessage = errorData.message || "Login failed"; // Adjust based on the actual error structure
                        toast.error(errorMessage, {
                            style: {
                                background: "rgb(255, 139, 139)",
                            },
                        });
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        }
        else {
            setSubmitClick(false)
        }


    };

    return (
        <>
            <Helmet>
                <title>FirstCode | Log In</title>
            </Helmet>
            <section className="StudentSignUpformSection">
                <div className={"StudentSignUpForm-image-container"}>
                    <div className={"TutorSignUpForm-image"}></div>
                </div>

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

                    <h1 style={{ color: "rgb(255, 153, 0)", fontSize: "30px" }}>Log In</h1>

                    {/* LOG IN FORM */}
                    <form onSubmit={handleSubmitClick}>
                        <label>
                            E-mail:
                            <input
                                type="email"
                                name="email"
                                value={loginDetails.email}
                                onChange={handleInputValueChange}
                            />
                        </label>
                        <br />

                        <label>
                            Role:
                            <select
                                name="role"
                                value={loginDetails.role}
                                onChange={handleInputValueChange}
                            >
                                <option value="">--Please choose an option--</option>
                                <option value="Tutor">Tutor</option>
                                <option value="Student">Student</option>
                            </select>
                        </label>
                        <br />

                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={loginDetails.password}
                                onChange={handlePasswordChange}
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
                        <br />
                        <RouteLink to={"/tutorforgotpasswordpage"}>
                            <li style={{ width: "100%", textAlign: "center" }} className="forgot-Password-link">Forgot Password?</li>
                        </RouteLink>
                    </form>
                </div>

                {/* Adding the toaster styling here */}
                <Toaster position="top-center" reverseOrder={false} />
            </section>
        </>
    );
};

export default LoginPage;

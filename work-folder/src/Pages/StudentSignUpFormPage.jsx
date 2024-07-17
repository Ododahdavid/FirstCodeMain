import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// importing toast to enable status notification
import toast, { Toaster } from "react-hot-toast";
import ButtonLoader from "../Loader/ButtonLoader";
import { Helmet } from "react-helmet";
import { AppContext } from "../GeneralComponents/ContextApi";

// Note: THE DOCUMENTATION IN THIS FILE IS ALSO APPLICABLE TO THE TutorSignInForm Component... so please read it properly, so you will not stress me 😊

// BECAUSE I DON NOT CURRENTLY KNOW BACKEND TECHNOLOGY YET, I WILL BE MAKING THIS STUDENT DETAILS STATE IN MY CONTEXT API... SO I CAN USE THE INFORMATION TO MAKE DASHBOARD SETTINGS


// destructuring the expected values of the form using a usestate called StudentDetails
const StudentSignUpFormPage = () => {

  const {studentDetails, setStudentDetails} = useContext(AppContext)

  // const [studentDetails, setStudentDetails] = useState({
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   experiencelevel: "",
  //   password: "",
  // });

  // Here i am destructing a variable formSubmitted, to know when the form has been submitted, for the purpose of navigation... if the form has been succesfully submitted, the user should be navigated tothe student dashboard
  const [formSubmitted, setFormSubmitted] = useState(false);
  // Here i am destructuringsubmitClicked, to know when the button has been clicked, so the loader i designed would come in place of the string "Submit" depending on the boolean value of the variable
  const [SubmitClick, setSubmitClick] = useState(false);

  const navigate = useNavigate();

  // This useEffect function is responsible for navigating the user to their dashboard after the form has been submitted successfully
  useEffect(() => {
    if (formSubmitted) {
      setTimeout(() => {
        navigate("/studentdashboard");
      }, 2000);
    }
  }, [formSubmitted, navigate]);

  // This function is responsible for getting the values of the different input fields in the form, and sending it to the variable studentDetails above
  const handleInputValueChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setStudentDetails({ ...studentDetails, [name]: value });
  };

  // This function takes note of when the form button is clicked, and cals the various functions in there, ad it also disables the button, so as to prevent users from clicking on the button again, while its processing
  const handleSubmitClick = (event) => {
    setSubmitClick(true);
    event.preventDefault();
    studentFormSubmitProcess(event);
    StudentSignUpFormButton.current.disabled = true; //disabling the form button
  };

  // This function is called when the form is being submitted, it calls the different functions i set for validating Input Data, and if true, the following commands beneath it will execute
  const studentFormSubmitProcess = (event) => {
    event.preventDefault();

    if (
      studentDetailsValidation() &&
      studentNameValidation() &&
      studentEmailValidation() &&
      PasswordStrengthValidator()
    ) {
      setTimeout(() => {
        setSubmitClick(false);
        toast.success("Form Submitted Successfully", {
          style: {
            background: "rgb(144, 234, 96)",
          },
        });
        setStudentDetails({
          firstname: "",
          lastname: "",
          email: "",
          experiencelevel: "",
          password: "",
        });
        setFormSubmitted(true);
        setPasswordStrength("");
        console.table(studentDetails);
      }, 2000);
    } else if (!PasswordStrengthValidator()) {
      // toast styling
      toast.error("Password is too weak", {
        style: {
          background: "rgb(240, 139, 156)",
        },
      });
      setTimeout(() => {
        // Use setTimeout to ensure it's executed after the timeout
        setSubmitClick(false); // Re-enable the button
        StudentSignUpFormButton.current.disabled = false; // Re-enable the button
      }, 1000);
    } else {
      setTimeout(() => {
        setSubmitClick(false);
      }, 2000);
    }
    StudentSignUpFormButton.current.disabled = false;
  };

  const StudentSignUpFormButton = useRef(null); //I used the hook useRef to capture the form button... you suppose sabi this one na

  // Validation functions
  const studentDetailsValidation = () => {
    const { firstname, lastname, email, experiencelevel, password } =
      studentDetails;

    if (
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      experiencelevel === "" ||
      password === ""
    ) {
      toast.error("Please fill all the fields", {
        style: {
          background: "rgb(240, 139, 156)",
        },
      });
      return false;
    } else {
      return true;
    }
  };

  const studentNameValidation = () => {
    const { firstname, lastname } = studentDetails;
    const stringOnlyRegex = /^[A-Za-z\s]+$/;

    if (!stringOnlyRegex.test(firstname) || !stringOnlyRegex.test(lastname)) {
      toast.error("Please Enter a Valid Name", {
        style: {
          background: "rgb(240, 139, 156)",
        },
      });
      return false;
    } else {
      return true;
    }
  };

  const studentEmailValidation = () => {
    const { email } = studentDetails;
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      toast.error("Please Enter a Valid Email", {
        style: {
          background: "rgb(240, 139, 156)",
        },
      });
      return false;
    } else {
      return true;
    }
  };

  const [passwordStrength, setPasswordStrength] = useState("");

  const PasswordStrengthValidator = () => {
    const { password } = studentDetails;

    if (password.trim().length <= 3) {
      setPasswordStrength("Too Weak");
      return false;
    } else if (password.trim().length > 3 && password.trim().length <= 6) {
      setPasswordStrength("Weak");
      return false;
    } else if (password.trim().length > 6 && password.trim().length <= 8) {
      setPasswordStrength("Good");
      return true;
    } else if (password.trim().length > 8) {
      setPasswordStrength("Strong");
      return true;
    }
  };

  const handlePasswordChange = (event) => {
    handleInputValueChange(event);
    PasswordStrengthValidator(event);
  };

  return (
    <>
      <Helmet>
        <title>FirstCode | Student sign up form</title>
      </Helmet>
      
      <section className="StudentSignUpformSection">
        <div className={"StudentSignUpForm-image-container"}>
          <div className={"StudentSignUpForm-image"}></div>
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

          <h1>
            Sign Up as a <span className={"OrangeKeyword"}>Student</span>
          </h1>

          {/* STUDENT SIGN UP FORM */}
          <form onSubmit={studentFormSubmitProcess}>
            <label>
              First Name:
              <input
                type="text"
                name={"firstname"}
                value={studentDetails.firstname}
                onChange={handleInputValueChange}
              />
            </label>
            <br />
            <label>
              Last Name:
              <input
                type="text"
                name={"lastname"}
                value={studentDetails.lastname}
                onChange={handleInputValueChange}
              />
            </label>
            <br />
            <label>
              E-mail:
              <input
                type="email"
                name={"email"}
                value={studentDetails.email}
                onChange={handleInputValueChange}
              />
            </label>
            <br />

            <label>
              Experience Level:
              <select
                name={"experiencelevel"}
                value={studentDetails.experiencelevel}
                onChange={handleInputValueChange}
              >
                <option value="">--Please choose an option--</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="master">Master</option>
              </select>
            </label>
            <br />

            <label>
              Password:
              <input
                type="password"
                name={"password"}
                value={studentDetails.password}
                onChange={handlePasswordChange}
              />
              <div className={"passwordStrengthContainer"}>
                <div
                  className={"passwordIndicator"}
                  style={{
                    backgroundColor:
                      passwordStrength === "Too Weak" ||
                      passwordStrength === "Weak" ||
                      passwordStrength === "Good" ||
                      passwordStrength === "Strong"
                        ? "red"
                        : "transparent",
                  }}
                ></div>

                <div
                  className={"passwordIndicator"}
                  style={{
                    backgroundColor:
                      passwordStrength === "Weak" ||
                      passwordStrength === "Good" ||
                      passwordStrength === "Strong"
                        ? "red"
                        : "transparent",
                  }}
                ></div>

                <div
                  className={"passwordIndicator"}
                  style={{
                    backgroundColor:
                      passwordStrength === "Good" ||
                      passwordStrength === "Strong"
                        ? "orange"
                        : "transparent",
                  }}
                ></div>

                <div
                  className={"passwordIndicator"}
                  style={{
                    backgroundColor:
                      passwordStrength === "Strong" ? "green" : "transparent",
                  }}
                ></div>
              </div>
              <p className={"passwordStrengthAlert"}>
                Your password is <span>{passwordStrength}</span>
              </p>
            </label>

            <div className={"sign-upButtonContainer"}>
              <button
                ref={StudentSignUpFormButton}
                type="submit"
                onClick={handleSubmitClick}
                disabled={SubmitClick}
              >
                {SubmitClick ? <ButtonLoader /> : "Submit"}
              </button>
            </div>
          </form>
        </div>

        {/* Adding the toaster styling here */}
        <Toaster position="top-center" reverseOrder={false} />
      </section>
    </>
  );
};

export default StudentSignUpFormPage;

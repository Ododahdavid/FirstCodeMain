import React, { useRef, useState } from "react";
import FeedBackImg from "../../SrcImages/feedBack.png";
// importing toast, and toaster from react hot toast, to display status messages
import toast, { Toaster } from "react-hot-toast";
import ButtonLoader from "../../Loader/ButtonLoader";

const ContactUs = () => {
  // Making usestate for form data collection
  const [contactUs, setContactUs] = useState({
    fullname: "",
    email: "",
    message: "",
  });

  const ContactUsFormButton = useRef(null);

  // states for fullname and email verification
  const [fullnameValid, setFullnameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);

  // Function that handles input change and updates the values of contactUs useState
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setContactUs({ ...contactUs, [name]: value });
  };

  // Form Validation function for fullname
  const contactUsFullNameValidator = () => {
    const stringOnlyRegex = /^[A-Za-z\s]+$/;

    const { fullname, email, message } = contactUs;

    if (fullname === "" || email === "" || message === "") {
      toast.error("All fields are required", {style: {
        background: "rgb(240, 139, 156)"
      }});
      return false;
    }

    // Validating fullname field and value
    if (!stringOnlyRegex.test(fullname)) {
      setFullnameValid(false);
      toast.error("Please enter a valid name", {style: {
        background: "rgb(240, 139, 156)"
      }});
      return false;
    } else {
      setFullnameValid(true);
      return true;
    }
  };

  // Function That validates the input field for email
  const contactUsEmailValidator = () => {
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const {email} = contactUs;

    // Validating email field and value
    if (!emailRegex.test(email)) {
      setEmailValid(false);
      toast.error("Please enter a valid email address", {style: {
        background: "rgb(240, 139, 156)"
      }});
      return false;
    } else {
      setEmailValid(true);
      return true;
    }
  };

  // I did this to add my Button loader when the button is clicked, SubmitClick is then set to true
  const [SubmitClick, setSubmitClick] = useState(false);

  const handleSubmitClick = (event) => {
    event.preventDefault();
    setSubmitClick(true);
    onSubmit(event);
    ContactUsFormButton.current.disabled = true;
  };

  // Functin that handles Submitting process
  const onSubmit = async (event) => {
    event.preventDefault();
    if (contactUsEmailValidator() && contactUsFullNameValidator()) {
        setTimeout(()=>{
            toast.success("Message sent Successfully", {style: {
              background: "rgb(144, 234, 96)"
            }});
            console.log(contactUs);
            setContactUs({
              fullname: "",
              email: "",
              message: "",
        })
        setSubmitClick(false);
        ContactUsFormButton.current.disabled = false;
      }, 2000);
      setSubmitClick(true);

    } else {
        setTimeout(()=>{
            toast.error("Invalid input", {style: {
              background: "rgb(240, 139, 156)"
            }});
            setSubmitClick(false);
            ContactUsFormButton.current.disabled = false;
            return false;
        }, 2000)
    }
  };

  // Set CSS for input fields based on validation status
  const fullnameStyle = fullnameValid
    ? { border: "2px solid green" }
    : { border: "2px solid red" };

  const emailStyle = emailValid
    ? { border: "2px solid green" }
    : { border: "2px solid red" };

  return (
    // jsx
    <>
      <section className={"ContactUs-section"} id="ContactUs-section">
        <h1>Contact Us</h1>

        <div className={"ContactUs-Container"}>
          <div className={"ContactUs-Image"}>
            <img
              style={{ width: "100%", height: "100%" }}
              src={FeedBackImg}
              alt="Pic"
            />
          </div>

          <div className={"ContactUs-form-container"}>
            <form onSubmit={onSubmit}>
              <label>
                Full Name:
                <input
                  type="text"
                  name="fullname"
                  value={contactUs.fullname}
                  onChange={handleChange}
                  placeholder={"Enter full name"}
                  style={fullnameStyle}
                />
              </label>
              <br />
              <label>
                Email:
                <input
                  type="text"
                  name="email"
                  value={contactUs.email}
                  onChange={handleChange}
                  placeholder={"Enter E-mail"}
                  style={emailStyle}
                />
              </label>
              <br />
              <label>
                Message:
                <textarea
                  name="message"
                  onChange={handleChange}
                  value={contactUs.message}
                  placeholder={"Enter Message"}
                ></textarea>
              </label>

              <button type="submit" ref={ContactUsFormButton} onClick={handleSubmitClick}>
              {
                  SubmitClick
                   ? <ButtonLoader/>
                    : "Submit"
                }
              </button>
            </form>
          </div>

          <Toaster position="top-center" reverseOrder={false} />
        </div>
      </section>
    </>
  );
};

export default ContactUs;

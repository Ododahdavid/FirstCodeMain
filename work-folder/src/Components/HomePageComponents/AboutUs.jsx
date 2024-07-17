import React from "react";
import meeting from "../../SrcImages/Meeting.png";

const AboutUs = () => {
  return (
    <>
      <section  className={"AboutUs-section"} id="about-us">
        <h1>About Us</h1>

        <div className="AboutUs-container">
          <div className={"AboutUs-img"}>
            <img
              style={{ width: "100%", height: "100%" }}
              src={meeting}
              alt="Pic"
            />
          </div>

          <div className={"AboutUs-Content"}>
            <p>
              <span>FirstCode</span> is a dedicated online learning platform designed to make
              programming accessible to everyone. Our mission is to break down
              the barriers to entry in the tech industry by providing
              high-quality, easy-to-understand coding courses for beginners.
              Founded in 2024, FirstCode was born out of a passion for education
              and a belief in the transformative power of coding. We understand
              that the world of programming can seem daunting to newcomers, and
              we’re here to change that. Our courses are designed with beginners
              in mind, breaking down complex concepts into manageable,
              understandable lessons. At FirstCode, we believe that anyone can
              learn to code. Whether you’re looking to change careers, upskill,
              or simply explore a new hobby, we’re here to guide you every step
              of the way. Our team of experienced instructors is committed to
              helping you achieve your learning goals and unlock your potential.
              Join us at FirstCode, and take the first step on your coding
              journey.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;

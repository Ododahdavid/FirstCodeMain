import React from "react";
import HowItWorksPic from "../../SrcImages/How-it-works.png";

const HowItWorks = () => {
  return (
    <>
      <section className={"HowItWorks-section"} id="how-it-works">
        <h1>How It Works?</h1>

        <div className="HowItWorks-container">

          <div className={"HowItWorks-Content"}>
            <p>
              <span>FirstCode</span> is your gateway to the world of programming. Sign up as a <span>Student</span> to learn from a wide range of courses, or join us as a <span>Tutor</span> to share your knowledge. Our platform is designed to make learning and teaching coding as seamless as possible. Dive in and start your coding journey with grace and ease at FirstCode.
            </p>
          </div>
          <div className={"HowItWorks-img"}>
            <img
              style={{ width: "100%", height: "100%" }}
              src={HowItWorksPic}
              alt="Pic"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;

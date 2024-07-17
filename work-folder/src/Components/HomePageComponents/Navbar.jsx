import React from "react";
import { Link as RouteLink } from "react-router-dom"
// npm install react-scroll
// import it as link
import { Link as ScrollLink } from "react-scroll"

const Navbar = () => {

    
  return (
    <>
       <nav className="HomePage-navbar">
        {/* Logo */}
        <ScrollLink to="header" spy={true} smooth={true} offset={-100} duration={500} >
        <div className="logo">
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
            <path d="M7.5 17.25 1.5 12l6-5.25" />
            <path d="m16.5 17.25 6-5.25-6-5.25" />
            <path d="m14.25 4.5-4.5 15" />
          </svg>

            <h2>First Code</h2>
       
        </div>
        </ScrollLink>

        {/* Nav Menu items */}

        {/* For the smooth scroll animation, we use the <Link/> tag as an anchor tag, and set these attributes like spy, smooth, offset, and duration... the to attribute is the name of the id you should give the element... the element can be in another component */}
        <ul>
            <li>
                <ScrollLink to="about-us" spy={true} smooth={true} offset={-100} duration={500} >
                    About Us
                </ScrollLink>
            </li>

            <li>

            <ScrollLink to="how-it-works" spy={true} smooth={true} offset={-100} duration={500}>
                    How It works
            </ScrollLink>

            </li>

            <li>
            <ScrollLink to="ContactUs-section" spy={true} smooth={true} offset={-100} duration={500}>
                    Contact us
            </ScrollLink>
            </li>
        </ul>

        {/* LOGIN AND SIGN UP BUTTONS */}
        <div className="login-signup">
         
         {/* */}
         <RouteLink to={"/loginformpage"}>
         <button className="login">Login</button>
         </RouteLink>

        <RouteLink to={"/signupquestionpage"}>
          <button className="signup">Sign Up</button>
          </RouteLink>
        </div>
     
      </nav>
    </>
  );
};

export default Navbar;

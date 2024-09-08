import React from 'react'
import { Link as ScrollLink } from "react-scroll"
import { Link as RouteLink, useNavigate } from "react-router-dom"

const StudentDashboardNavbar = () => {



  return (
    <>
    
    <div className={"studentDashboardNavbar"}>

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

    </div>
    </>
    
  )
}

export default StudentDashboardNavbar
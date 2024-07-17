import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../GeneralComponents/ContextApi'
import { Link as ScrollLink } from "react-scroll"
import { Link as RouteLink, useNavigate } from "react-router-dom"
import DropDown from "../../SrcImages/drop-down.png"
import LogOut from "../../SrcImages/logout.png"


const TutorDashBoardNavBar = () => {
    const [tutorDetails, setTutorDetails] = useState("")

    const [userMenu, setUserMenu] = useState(true)
    const [LogOutClick, setLogOutClick] = useState(false)

    const navigate = useNavigate()

    const handlelogOut = () => {
        setLogOutClick(true)
        localStorage.removeItem('tutorData');
        setUserMenu(false);
        navigate("/*")
    }


    useEffect(() => {
        const storedTutorDetails = localStorage.getItem('tutorData');
        if (storedTutorDetails) {
            const parsedDetails = JSON.parse(storedTutorDetails);
            setTutorDetails({
                firstname: parsedDetails.firstname,
                lastname: parsedDetails.lastname,
                email: parsedDetails.email,
            });
        }
    }, []);

    const UserMenu = useRef(null)

    useEffect(() => {
        // when getting from the local storage, always put it in a variable -Sir kingdom
        const storedTutorDetails = localStorage.getItem('TutorDetails :');
        if (storedTutorDetails) {
            setTutorDetails(JSON.parse(storedTutorDetails));
        }
    }, [setTutorDetails]);

    function capitalizeFirstLetter(string) {
        return string ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase() : '';
    }



    //  functions to handle usermenu click
    const handleUserMenuState = () => {
        setUserMenu(!userMenu);

    }
    const RevealUserMenu = () => {
        if (userMenu === true) {
            UserMenu.current.style.display = "block"
        }
        else {
            UserMenu.current.style.display = "none"
        }
    }
    // Grouping the two functions together
    const handleUserMenuClick = () => {
        handleUserMenuState();
        RevealUserMenu();
    }

    return (
        <>
            <nav className={"TutorDashBoardNav"}>
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


                <div className={"UserMenuButton"} onClick={handleUserMenuClick} style={{ cursor: "pointer", userSelect: "none" }}>
                    {capitalizeFirstLetter(tutorDetails.firstname)}
                    <img src={DropDown} alt="Pic" />
                </div>
            </nav>
            <div ref={UserMenu} className={"UserMenu"}>

                <div className={"UserMenuProfileDisplay"}>

                    <img src="PublicImages/UnknownAvatarImage.png" alt="Pic" />

                </div>

                <div className={"UserMenuFullname"}>
                    {`${capitalizeFirstLetter(tutorDetails.firstname)} ${capitalizeFirstLetter(tutorDetails.lastname)}`}
                </div>

                <div className={"UserMenuEmail"}>
                    <p>{tutorDetails.email}</p>
                </div>

                <div onClick={handlelogOut} className={"UserMenu-LogOut"}>
                    <img src={LogOut} alt="Pic" />
                    Log out
                </div>

            </div>
        </>
    )
}

export default TutorDashBoardNavBar 
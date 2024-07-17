import React, { useContext } from 'react'
import WhiteDashBoardIcon from "../../SrcImages/DashBoard-white-image.png"
import BlueDashBoardIcon from "../../SrcImages/DashBoard-blue-image.png"
import WhiteCoursesIcon from "../../SrcImages/Courses-white-image.png"
import BlueCoursesIcon from "../../SrcImages/Courses-blue-image.png"
import WhiteAddCourseIcon from "../../SrcImages/AddButton-white-Image.png"
import BlueAddCourseIcon from "../../SrcImages/AddButton-blue-Image.png"
import WhiteNotificationIcon from "../../SrcImages/Notification-white-image.png"
import BlueNotificationIcon from "../../SrcImages/Notification-blue-image.png"
import { AppContext } from '../../GeneralComponents/ContextApi'

const SideBar = () => {

    const {TutorDashBoardIconClick, setTutorDashBoardIconClick, TutorCoursesIconClick, setTutorCoursesIconClick, TutorCreateCourseIconClick, setTutorCreateCourseIconClick, TutorNotificationIconClick, setTutorNotificationIconClick} = useContext(AppContext)

    // Function to take note of when the dashboard is clicked, and it sets TutorDashBoardIconClick to true. When the variable is true, the Dashboard icon, and background clolor should change, and the DashBoard should be rendered. Thats the idea for the other icons!!!!
    const handleTutorDashBoardIconClick = () => {
        setTutorDashBoardIconClick(true)
        // setting the others to false
        setTutorCoursesIconClick(false)
        setTutorCreateCourseIconClick(false)
        setTutorNotificationIconClick(false)
    }

    const handleTutorCreateCourseIconClick = () => {
        setTutorCreateCourseIconClick(true)
        // setting the others to false
        setTutorDashBoardIconClick(false)
        setTutorCoursesIconClick(false)
        setTutorNotificationIconClick(false)
    }

    const handleTutorCoursesIconClick = () => {
        setTutorCoursesIconClick(true)
        //setting the others to false
        setTutorDashBoardIconClick(false)
        setTutorCreateCourseIconClick(false)
        setTutorNotificationIconClick(false)
    }

    const handleTutorNotificationIconClick = () => {
        setTutorNotificationIconClick(true)
        //setting the others to false
        setTutorDashBoardIconClick(false)
        setTutorCoursesIconClick(false)
        setTutorCreateCourseIconClick(false)
    }

    

  return (
    <>
        <aside className={"Tutor-DashBoard-SideBar"}>

            {/* All i did here, was dynamically, render different images, depending on the state of the click functions i assigned to them */}

            {/*  */}
            <div style={TutorDashBoardIconClick === false ? {backgroundColor:"white", transition: ".2s"} : {backgroundColor: "blue", color: "white", transition: ".2s"}} onClick={handleTutorDashBoardIconClick} title='Dashboard'>
                <img src={TutorDashBoardIconClick === false ? BlueDashBoardIcon : WhiteDashBoardIcon} alt="Dashboard" /> 

                <h3>Dashboard</h3>

            </div>
            


            <div style={TutorCoursesIconClick === false ? {backgroundColor:"white", transition: ".2s"} : {backgroundColor: "blue", color: "white", transition: ".2s"}} onClick={handleTutorCoursesIconClick} title='Courses'>
                <img src={ TutorCoursesIconClick === false ? BlueCoursesIcon : WhiteCoursesIcon } alt="Courses" />

                <h3>Courses</h3>
            </div>
            


            <div style={TutorCreateCourseIconClick === false ? {backgroundColor:"white", transition: ".2s"} : {backgroundColor: "blue", color: "white", transition: ".2s"}} onClick={handleTutorCreateCourseIconClick} title='Create Course'>
                <img src={ TutorCreateCourseIconClick === false ? BlueAddCourseIcon : WhiteAddCourseIcon } alt="Create Course" />

                <h3>Create Course</h3>
            </div>
            
            <div style={TutorNotificationIconClick === false ? {backgroundColor:"white"} : {backgroundColor: "blue", color: "white", transition: ".2s"}} onClick={handleTutorNotificationIconClick} title='Notification'>
                <img src={TutorNotificationIconClick === false ? BlueNotificationIcon: WhiteNotificationIcon} alt="Notification" />

                <h3>Inbox</h3>
            </div>

        </aside>
    </>
  )
}

export default SideBar
import React, { useContext } from 'react'
import WhiteDashBoardIcon from "../../SrcImages/DashBoard-white-image.png"
import BlueDashBoardIcon from "../../SrcImages/DashBoard-blue-image.png"
import { AppContext } from '../../GeneralComponents/ContextApi'
import WhiteCoursesIcon from "../../SrcImages/Courses-white-image.png"
import BlueCoursesIcon from "../../SrcImages/Courses-blue-image.png"
import WhiteSearchIcon from "../../SrcImages/searchButtonWhite.png"
import BlueSearchIcon from "../../SrcImages/searchButtonBlue.png"
import WhiteNotificationIcon from "../../SrcImages/Notification-white-image.png"
import BlueNotificationIcon from "../../SrcImages/Notification-blue-image.png"

const StudentDashboardSidebar = () => {

    const { StudentDashboardIconClick, setStudentDashboardIconClick, StudentSearchIconClick, setStudentSearchIconClick, StudentCoursesIconClick, setStudentCoursesIconClick, StudentInboxIconClick, setStudentInboxIconClick } = useContext(AppContext)

    // creating functions for the sidebar menu. so when the one menu on the sidebar is clicked, its state is set to true, and the other menus on the sidebar is set to false. this will be used for dynaically rendering its componets to the display box beside the side bar


    const handleStudentDashboardIconClick = () => {
        setStudentDashboardIconClick(true)
        // setting the others to false
        setStudentSearchIconClick(false)
        setStudentCoursesIconClick(false)
        setStudentInboxIconClick(false)
    }
    const handleStudentSearchIconClick = () => {
        setStudentSearchIconClick(true)
        // setting the others to false
        setStudentDashboardIconClick(false)
        setStudentCoursesIconClick(false)
        setStudentInboxIconClick(false)
    }
    const handleStudentCoursesIconClick = () => {
        setStudentCoursesIconClick(true)
        // setting the others to false
        setStudentDashboardIconClick(false)
        setStudentSearchIconClick(false)
        setStudentInboxIconClick(false)
    }
    const handleStudentInboxIconClick = () => {
        setStudentInboxIconClick(true)
        // setting the others to false
        setStudentDashboardIconClick(false)
        setStudentSearchIconClick(false)
        setStudentCoursesIconClick(false)
    }


    return (
        <>
            <aside className={"studentDashBoardSidebar"}>
                {/* menus on the sidebar */}

                {/* menu for the Student's Dashboard */}
                <div style={StudentDashboardIconClick === false ? { backgroundColor: "white", transition: ".2s" } : { backgroundColor: "blue", color: "white", transition: ".2s" }} onClick={handleStudentDashboardIconClick} title='Dashboard'>
                    <img src={StudentDashboardIconClick === false ? BlueDashBoardIcon : WhiteDashBoardIcon} alt="Dashboard" />

                    <h3>Dashboard</h3>

                </div>
                <br />
                {/* ================================================================================== */}

                    {/* menu for students search menu */}
                <div style={StudentSearchIconClick === false ? { backgroundColor: "white", transition: ".2s" } : { backgroundColor: "blue", color: "white", transition: ".2s" }} onClick={handleStudentSearchIconClick} title='Courses'>
                    <img src={StudentSearchIconClick === false ? BlueSearchIcon : WhiteSearchIcon} alt="Create Course" />

                    <h3>Search</h3>
                </div>

                <br />
                {/* =================================================================================== */}

                {/* menu for students enrolled courses */}
                <div style={StudentCoursesIconClick === false ? { backgroundColor: "white", transition: ".2s" } : { backgroundColor: "blue", color: "white", transition: ".2s" }} onClick={handleStudentCoursesIconClick} title='Create Course'>

                    <img src={StudentCoursesIconClick === false ? BlueCoursesIcon : WhiteCoursesIcon} alt="Courses" />

                    <h3>Courses</h3>
                </div>

                <br />
                {/* ========================================================================== */}

                {/* menu for students inbox */}
                <div style={StudentInboxIconClick === false ? {backgroundColor:"white"} : {backgroundColor: "blue", color: "white", transition: ".2s"}} onClick={handleStudentInboxIconClick} title='Notification'>
                <img src={StudentInboxIconClick === false ? BlueNotificationIcon: WhiteNotificationIcon} alt="Notification" />

                <h3>Inbox</h3>
            </div>


            </aside>
        </>
    )
}

export default StudentDashboardSidebar
import React, { useContext } from 'react'
import { Helmet } from "react-helmet";
import Loader from '../Loader/Loader';
import ButtonLoader from '../Loader/ButtonLoader';
import StudentDashboardNavbar from "../Components/StudentDashBoardComponents/StudentDashboardNavbar.jsx"
import StudentDashboardSidebar from '../Components/StudentDashBoardComponents/StudentDashboardSidebar.jsx';
import {StudentDashboardPage, StudentSearchPage, EnrolledCourses} from "../Components/StudentDashBoardComponents/StudentDashboardDynamicSectionRenderer.jsx"
import { AppContext } from '../GeneralComponents/ContextApi.jsx';


const StudentDashboard = () => {

  const { StudentDashboardIconClick, setStudentDashboardIconClick, StudentSearchIconClick, setStudentSearchIconClick, StudentCoursesIconClick, setStudentCoursesIconClick, StudentInboxIconClick, setStudentInboxIconClick } = useContext(AppContext) 

  return (
    <>
         <Helmet>
            <title>Student Dashboard</title>
        </Helmet>

        <StudentDashboardNavbar/>
        

        <section className={"studentDashboardMainSection"}>

          <StudentDashboardSidebar/>

          <div className={"studentDashboardDynamicRenderingBox"}>
            
            {StudentDashboardIconClick && <StudentDashboardPage/>}
            {StudentSearchIconClick && <StudentSearchPage/>}
            {StudentCoursesIconClick && <EnrolledCourses/>}

          </div>
          
        </section>
        
    </>
  )
}

export default StudentDashboard
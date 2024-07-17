import React from 'react'
import { Helmet } from "react-helmet";
import Loader from '../Loader/Loader';
import ButtonLoader from '../Loader/ButtonLoader';


const StudentDashboard = () => {
  return (
    <>
         <Helmet>
            <title>Student Dashboard</title>
        </Helmet>
        
        <Loader/>
        <ButtonLoader/>
    </>
  )
}

export default StudentDashboard
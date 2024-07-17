import React from 'react'
import { Helmet } from "react-helmet";
import Header from '../Components/HomePageComponents/Header';
import Navbar from '../Components/HomePageComponents/Navbar';
import AboutUs from '../Components/HomePageComponents/AboutUs';
import HowItWorks from '../Components/HomePageComponents/HowItWorks';
import ContactUs from '../Components/HomePageComponents/ContactUs';


const HomePage = () => {
// Changes
  return (
    <>
        {/* Title of the page */}
        <Helmet>
            <title>FirstCode | Home</title>
        </Helmet>

        {/* Importing different components to make up the homepage */}
        <Navbar />
        <Header />
        <AboutUs  />
        <HowItWorks />
        <ContactUs />
        
    </>
  )
}

export default HomePage
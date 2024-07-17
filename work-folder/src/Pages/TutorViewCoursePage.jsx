import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../GeneralComponents/ContextApi';
import TutorDashBoardNavBar from '../Components/TutorDashBoardComponents/TutorDashBoardNavBar';

const TutorViewCoursePage = () => {
    // fetching the details from the URL
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const courseId = parseInt(queryParams.get('key'), 10); // Telling the broswer to return the number a base 10 number, not compulsory

    const { TutorDetails } = useContext(AppContext);
    const [course, setCourse] = useState(null);

    useEffect(() => {
        // Checking if TutorDetails is available in context
        if (TutorDetails && TutorDetails.courses && TutorDetails.courses[courseId]) {
            const course = TutorDetails.courses[courseId]; // Creating a new variable that is equal to the course set at the index of the courses array if tutorDetails is available
            setCourse(course);
            // Store course in localStorage
            localStorage.setItem('storedCourse', JSON.stringify(course));
        } else {
            // If not, load it from localStorage
            const storedCourse = localStorage.getItem('storedCourse');
            if (storedCourse) {
                setCourse(JSON.parse(storedCourse));
            }
        }
    }, [TutorDetails, courseId]);

    if (!course) {
        return <div>Course not found.</div>;
    }

    return (
        <>
            <TutorDashBoardNavBar />
            <div className={"TutorLessonPageContainer"}>
                <header className={"TutorLessonPage-Header"}>

                    <h1 className={"TutorLessonPage-Course-Author"}>Created by {`${TutorDetails.lastname} ${TutorDetails.firstname}`}</h1>
                    <h2 className={"TutorLessonPage-Course-Title"}>{course.courseTitle}</h2>
                    <p>{course.courseDescription}</p>
               
                </header>
                <br />
                <section className={"TutorLessonsContainer"}>

                </section>
            </div>
        </>
    );
}

export default TutorViewCoursePage;

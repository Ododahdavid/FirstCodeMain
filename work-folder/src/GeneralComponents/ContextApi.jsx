
import React, { createContext, useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// import propTypes from "prop-types"

// This is a global variable set as a context api
export const AppContext = createContext("here");

export const AppcontextProvider = (props) => {




    const { children } = props;

    // Here i am destructing the form details from the student sign in form, so it can be accessble for later




    // Destucturing variables that will change values when the menus on the Tutor dashboard side bar is clicked
    const [TutorDashBoardIconClick, setTutorDashBoardIconClick] = useState(true)
    const [TutorCoursesIconClick, setTutorCoursesIconClick] = useState(false)
    const [TutorCreateCourseIconClick, setTutorCreateCourseIconClick] = useState(false)
    const [TutorNotificationIconClick, setTutorNotificationIconClick] = useState(false)


    // Destructuring variables that will change values when the menus on the student dashboard side bar is clicked
    const [StudentDashboardIconClick, setStudentDashboardIconClick] = useState(true)
    const [StudentSearchIconClick, setStudentSearchIconClick] = useState(false)
    const [StudentCoursesIconClick, setStudentCoursesIconClick] = useState(false)
    const [StudentInboxIconClick, setStudentInboxIconClick] = useState(false)



    {/* npm install recharts  to install Charts*/ }



    // Sample DATA for Tutor Dashboard
    const data = [
        {
            course: 'React Basics',
            completionRate: 85,
            enrolledStudents: 200,
            averageRating: 4.5,
            completedAssignments: 180
        },
        {
            course: 'Advanced React',
            completionRate: 78,
            enrolledStudents: 150,
            averageRating: 4.3,
            completedAssignments: 120
        },
        {
            course: 'JavaScript Fundamentals',
            completionRate: 92,
            enrolledStudents: 300,
            averageRating: 4.8,
            completedAssignments: 280
        },
        {
            course: 'Node.js Essentials',
            completionRate: 70,
            enrolledStudents: 130,
            averageRating: 4.1,
            completedAssignments: 90
        },
        {
            course: 'CSS Mastery',
            completionRate: 88,
            enrolledStudents: 220,
            averageRating: 4.6,
            completedAssignments: 200
        },
        {
            course: 'HTML & Web Design',
            completionRate: 95,
            enrolledStudents: 250,
            averageRating: 4.9,
            completedAssignments: 240
        },
        {
            course: 'TypeScript in Depth',
            completionRate: 80,
            enrolledStudents: 180,
            averageRating: 4.4,
            completedAssignments: 150
        },
        {
            course: 'GraphQL Basics',
            completionRate: 75,
            enrolledStudents: 160,
            averageRating: 4.2,
            completedAssignments: 130
        },
        {
            course: 'Docker & Kubernetes',
            completionRate: 65,
            enrolledStudents: 100,
            averageRating: 3.9,
            completedAssignments: 70
        },
        {
            course: 'Python for Data Science',
            completionRate: 90,
            enrolledStudents: 270,
            averageRating: 4.7,
            completedAssignments: 260
        },
        {
            course: 'Machine Learning with Python',
            completionRate: 82,
            enrolledStudents: 210,
            averageRating: 4.5,
            completedAssignments: 190
        },
        {
            course: 'DevOps Fundamentals',
            completionRate: 72,
            enrolledStudents: 140,
            averageRating: 4.0,
            completedAssignments: 100
        },
        {
            course: 'Angular Essentials',
            completionRate: 77,
            enrolledStudents: 175,
            averageRating: 4.3,
            completedAssignments: 140
        },
        {
            course: 'Vue.js for Beginners',
            completionRate: 85,
            enrolledStudents: 190,
            averageRating: 4.6,
            completedAssignments: 170
        },
    ];

    const TutorDashboardGraph = (
        <ResponsiveContainer width="70%" height={"100%"} style={{ backgroundColor: "white" }} >
            <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="course" />
                <YAxis domain={[0, 100]} />
                <Tooltip
                    content={({ payload }) => {
                        if (payload && payload.length) {
                            const { course, completionRate, enrolledStudents, averageRating, completedAssignments } = payload[0].payload;
                            return (
                                <div className="custom-tooltip">
                                    <p>{`Course: ${course}`}</p>
                                    <p>{`Completion Rate: ${completionRate}%`}</p>

                                    <p>{`Average Rating: ${averageRating}`}</p>

                                </div>
                            );
                        }
                        return null;
                    }}
                />
                <Area type="monotone" dataKey="completionRate" stroke="#8884d8" fill="rgb(255, 153, 0)" />
                <Area type="monotone" dataKey="enrolledStudents" stroke="#8884d8" fill="blue" />
            </AreaChart>
        </ResponsiveContainer>
    );





    //   Here, is where i place the variables i want to make accessible to all components in my Project
    const contextValue = {
       TutorDashBoardIconClick, setTutorDashBoardIconClick, TutorCoursesIconClick, setTutorCoursesIconClick, TutorCreateCourseIconClick, setTutorCreateCourseIconClick, TutorNotificationIconClick, setTutorNotificationIconClick, TutorDashboardGraph, StudentDashboardIconClick, setStudentDashboardIconClick, StudentSearchIconClick, setStudentSearchIconClick, StudentCoursesIconClick, setStudentCoursesIconClick, StudentInboxIconClick, setStudentInboxIconClick
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

// AppcontextProvider.propTypes = {
//     children: propTypes.node.isRequired //Validating children PROPS
// }

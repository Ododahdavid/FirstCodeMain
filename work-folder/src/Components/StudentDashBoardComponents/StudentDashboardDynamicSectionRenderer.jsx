import React, { useEffect, useRef, useState } from 'react';
import streakPic from "../../SrcImages/streakPic.png";
import toast, { Toaster } from "react-hot-toast";


export const StudentDashboardPage = () => {
    const streakRemiderDialog = useRef(null);

    // function to capitalise the first letter of a string
    function capitalizeFirstLetter(string) {
        if (string.length === 0) {
            return string; // Return the string if it's empty
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    // State to handle student details for rendering on the page
    const [studentDetails, setStudentDetails] = useState({
        firstname: "",
        lastname: "",
        email: "",
        streak: ""
    });

    // useEffect to check if the dialog should be shown (once a day)
    useEffect(() => {
        const lastShown = localStorage.getItem('lastStreakDialogShown');
        const today = new Date().toISOString().split('T')[0];  // Get current date in YYYY-MM-DD format

        // Check if streak is greater than 0 and the dialog hasn't been shown today
        if (studentDetails.streak > 0 && lastShown !== today) {
            streakRemiderDialog.current.showModal();
            localStorage.setItem('lastStreakDialogShown', today);  // Update last shown date
        }
    }, [studentDetails.streak]);  // Add studentDetails.streak as a dependency

    // useEffect to get student details from local storage and update state
    useEffect(() => {
        const storedStudentDetails = localStorage.getItem('studentData');
        if (storedStudentDetails) {
            const parsedDetails = JSON.parse(storedStudentDetails);
            setStudentDetails({
                firstname: parsedDetails.firstname,
                lastname: parsedDetails.lastname,
                email: parsedDetails.email,
                streak: parsedDetails.streak
            });
        }
    }, []);

    // Function to close the dialog with animation
    const handleCloseDialog = () => {
        if (streakRemiderDialog.current) {
            streakRemiderDialog.current.classList.add("closing"); // Add closing class for animation
            setTimeout(() => {
                streakRemiderDialog.current.close();
                streakRemiderDialog.current.classList.remove("closing"); // Remove closing class after animation
            }, 400); // Match the timeout with the animation duration
        }
    };

    return (
        <>
            {/* Dialog to show the student's streak progress */}
            <dialog className={"streakReminderDialog"} ref={streakRemiderDialog}>
                <h2>Streak Reminder</h2>
                <h3>Congratulations! You are on a <span>{studentDetails.streak}</span> day streak 😁</h3>
                <div className={"streakIMageWrapper"}>
                    <img src={streakPic} alt="StreakImage" />
                </div>
                <h3>🔥 You're on fire! Keep the streak alive and push yourself to new heights every day. Consistency is the key to success! 🚀</h3>
                <button onClick={handleCloseDialog}>Let's GO! 🚀</button>
            </dialog>


            <div className={"studentDashboardBanner"}>
                <div className={"profilePictureBlock"}>
                    {/* Profile picture */}
                    <div className={"StudentprofilePictureWrapper"}>
                        <img src="PublicImages/UnknownAvatarImage.png" alt="profilePic" />
                    </div>
                </div>

                {/* Greeting the student */}
                <div className={"StudentGreetingsBlock"}>
                    <h1>Hello {capitalizeFirstLetter(studentDetails.firstname)}!</h1>
                    <p>Welcome to your Student Dashboard</p>
                </div>

                {/* Display student stats like streak */}
                <div className={"studentStatBlock"}>
                    <h2>Streak: <span>{studentDetails.streak}</span> 🔥</h2>
                </div>
            </div>

            <br />

            <section className={"ongoingCoursesSection"}>
                {/* Display student's ongoing courses */}
                <h1>Ongoing Course(s)</h1>
            </section>
        </>
    );
};

// =======================================================================================

// Module for search page on the student Dashboard


export const StudentSearchPage = () => {

    // function to capitalise the first letter of a string
    function capitalizeFirstLetter(string) {
        if (string.length === 0) {
            return string; // Return the string if it's empty
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const [recommendedCourses, setRecommendedCourses] = useState([])

    //  function to fetch random/recommended courses before student searches/makes a search
    useEffect(() => {
        // Define an async function inside useEffect
        const fetchRecommendedCourses = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch('http://127.0.0.1:7000/api/v1/user/student/recommended/courses', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json(); // Convert response to JSON
                setRecommendedCourses(data); // Update the state with the fetched data
                console.log(data);
            } catch (err) {
                console.error('Error fetching recommended courses:', err);
            }
        };

        fetchRecommendedCourses();
    }, [])

    // state to get the search value from the search bar
    const [searchValue, setSearchValue] = useState({
        value: ""
    })

    const handleInputValueChange = (event) => {
        // destructuring the name and value fields for updating the login details state
        const { name, value } = event.target;
        setSearchValue(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const searchBarInputValidator = () => {
        if (searchValue.value.trim().length === 0) {
            toast.error("Input is required", {
                style: {
                    background: "rgb(255, 139, 139)",
                },
            });
            return false;
        }
        return true;
    }

    // state to store the incoming search results from the student search bar
    const [searchResults, setSearchResults] = useState([])

    const handleSearchSubmit = async(event) => {
        event.preventDefault();
        if (searchBarInputValidator()) {
            try {
                const token = localStorage.getItem("token");
                
                const response = await fetch('http://127.0.0.1:7000/api/v1/user/student/searched/courses', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(searchValue),
                });
                const data = await response.json(); // Convert response to JSON
                setSearchResults(data); // Update the state with the fetched data
                setTimeout(() => {
                console.log(searchResults)
                }, 2000);
            }
            catch (err) {
                console.error('Error searching courses:', err);
            }
        }
    }


    return (
        <>
            {/* Search bar for student to search for courses    // search bar */}
            <div className={"studentDashBoardSearchBarContainer"}>
                <form onSubmit={handleSearchSubmit} className={"studentDashBoardSearchBar"}>
                    <input name='value' value={searchValue.value} type="text" placeholder="Search courses" onChange={handleInputValueChange} />
                    <button type="submit">Search</button>
                </form>
            </div>

            {/* // =======================================================
                    // section to diplay courses */}

            <section className={"searchCoursesDisplayContainer"}>
                {recommendedCourses.length > 0 ? (
                    recommendedCourses.map((course) => (
                        <div key={course.id} className={"courseCard"}>
                            <h3>{capitalizeFirstLetter(course.title)}</h3>
                            <br />
                            <p>{course.description}</p>
                            <br />
                            <span>Created by: <span>{course.tutorId.firstname} {course.tutorId.lastname}</span></span>
                        </div>
                    ))
                ) : (
                    <p>No courses available at the moment.</p>
                )}

                {/* Adding the toaster styling here */}
                <Toaster position="top-center" reverseOrder={false} />
            </section>


        </>
    )
}


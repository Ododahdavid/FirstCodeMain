import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../GeneralComponents/ContextApi';
import CreateCourseIcon from "../../SrcImages/AddButton-blue-Image.png";
import toast, { Toaster } from "react-hot-toast";
import Cancel from "../../SrcImages/cancel.png";
import ButtonLoader from "../../Loader/ButtonLoader";
import { useNavigate } from 'react-router-dom';
import Loader from "../../Loader/Loader.jsx";

// TutorsDashBoard component to display tutor's information
export const TutorsDashBoard = () => {
    const { TutorDashboardGraph } = useContext(AppContext);

    const [tutorDetails, setTutorDetails] = useState({
        firstname: '',
        lastname: '',
        email: '',
        experiencelevel: ''
    });

    useEffect(() => {
        const storedTutorDetails = localStorage.getItem('tutorData');
        if (storedTutorDetails) {
            const parsedDetails = JSON.parse(storedTutorDetails);
            setTutorDetails({
                firstname: parsedDetails.firstname,
                lastname: parsedDetails.lastname,
                email: parsedDetails.email,
                experiencelevel: parsedDetails.experiencelevel
            });
        }
    }, []);

    function capitalizeFirstLetter(string) {
        return string ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase() : '';
    }

    return (
        <>
            <div className="Tutor-Dashboard-Banner">
                <section className="profilePic-containier">
                    <div className="TutorProfilePic-wrapper">
                        <img src="PublicImages/UnknownAvatarImage.png" alt="ProfilePic" />
                    </div>
                </section>
                <div className="TutorDashBoardBannerWelcomeLineContainer">
                    <h1>Welcome {capitalizeFirstLetter(tutorDetails.firstname)},</h1>
                    <span>Level: <span className="Tutor-DashBoard-Stat-Value"> 0</span></span>
                </div>
                <div className="TutorDashBoard-stats">
                    <span>Experience Level: <span className="Tutor-DashBoard-Stat-Value">{capitalizeFirstLetter(tutorDetails.experiencelevel)}</span></span>
                    <span>Total Courses: <span className="Tutor-DashBoard-Stat-Value"> 0</span> </span>
                    <span>Total Students: <span className="Tutor-DashBoard-Stat-Value"> 0</span></span>
                </div>
            </div>
            <br />
            <h1 className="Tutor-CourseCompletion-header">Courses Statistics</h1>
            <div className="Tutor-DashBoardGraph-Container">
                {TutorDashboardGraph}
            </div>
        </>
    );
};




// =============================================================================================







// CourseCard component to display individual course details inside the course display section
const CourseCard = ({ course, onDelete }) => {
    const navigate = useNavigate();
    const courseDeleteButton = useRef(null);
    const [optionClick, setOptionClick] = useState(false);
    const deleteConfirmDialog = useRef(null);

    useEffect(() => {
        if (optionClick) {
            courseDeleteButton.current.style.display = "flex";
        } else {
            courseDeleteButton.current.style.display = "none";
        }
    }, [optionClick]);

    const navigateToCoursePage = () => {
        navigate(`/tutorviewcoursepage?tutor=${course.tutorId.firstname}&course=${course.title}`);
    };

    const showDeleteConfirmModal = () => {
        deleteConfirmDialog.current.showModal();
    };

    const closeDeleteDialog = () => {
        deleteConfirmDialog.current.close();
        setOptionClick(false);
    };

    const deleteOptionSwitch = () => {
        setOptionClick(prevOptionClick => !prevOptionClick);
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        deleteConfirmDialog.current.close();
        try {
    
            const response = await fetch(`http://127.0.0.1:7000/api/v1/user/tutor/delete/course/${course._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            const data = await response.json();
    
            if (response.ok) {
                toast.success("Course deleted successfully", {
                    style: {
                        background: "rgb(144, 234, 96)",
                    },
                });
                onDelete(course._id);  // Update the parent state
            } else {
                toast.error(`Failed to delete course: ${data.message}`, {
                    style: {
                        background: "rgb(255, 139, 139)",
                    },
                });
            }
        } catch (error) {
            console.error("Error during course deletion:", error);
            toast.error('Something went wrong', {
                style: {
                    background: "rgb(255, 139, 139)",
                },
            });
        }
    };
    

    return (
        <>
            <div className="course-card">
                <div className="options-wrapper">
                    <svg onClick={deleteOptionSwitch} width="15" height="15" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 14.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"></path>
                        <path d="M12 21.75a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"></path>
                        <path d="M12 6.75a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"></path>
                    </svg>
                    <br />
                </div>

                <div ref={courseDeleteButton} className="Course-delete-Button" onClick={showDeleteConfirmModal}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="m5.25 5.25.938 15c.044.867.675 1.5 1.5 1.5h8.625c.828 0 1.447-.633 1.5-1.5l.937-15"></path>
                        <path d="M3.75 5.25h16.5"></path>
                        <path d="M9 5.25V3.375a1.122 1.122 0 0 1 1.125-1.125h3.75A1.121 1.121 0 0 1 15 3.375V5.25"></path>
                        <path d="M12 8.25v10.5"></path>
                        <path d="M8.625 8.25 9 18.75"></path>
                        <path d="M15.375 8.25 15 18.75"></path>
                    </svg>
                    <h5>delete</h5>
                </div>

                <div className="course-card-bg"></div>
                <h2 className="course-card-title">{course.title}</h2>
                <p className="course-card-subtitle">{course.description}</p>
                <p className="course-card-author">Created by {`${course.tutorId.firstname} ${course.tutorId.lastname}`}</p>
            </div>

            <dialog className='deleteCourseConfirmDialog' ref={deleteConfirmDialog}>
                <div>
                    <h2>Are you sure you want to delete your course <span style={{ color: 'blue' }}>{`${course.title}`}</span>?</h2>
                    <br />
                    <div className={"deleteCourseDialogButtonsContainer"}>
                        <button style={{ backgroundColor: 'rgb(245, 86, 86)', color: "white" }} onClick={handleDelete}>delete</button>
                        <button onClick={closeDeleteDialog}>Cancel</button>
                    </div>
                </div>
            </dialog>
        </>
    );
};




// ==============================================================================================









// TutorsCourses component to display the list of courses
export const TutorsCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch courses when the component mounts
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://127.0.0.1:7000/api/v1/user/tutor/get/courses', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setCourses(data);
                setLoading(false);
            } catch (error) {
                toast.error("Error fetching your courses", {
                    style: {
                        background: "rgb(255, 139, 139)",
                    },
                });
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleDeleteHideCourse = (courseId) => {
        setCourses(courses.filter(course => course._id !== courseId));
        // using the filter method to create a new array of courses... if the courseId is equal to the selected courseId, it ecludes it fro the new array.
    };

    return (
        <div className="tutors-courses-container">
            <h1 className="tutors-courses-title">Your Courses</h1>
            <div className="tutors-courses-flex">
                {loading ? (
                    <Loader />
                ) : courses && courses.length > 0 ? (
                    courses.map((course, index) => (
                        <CourseCard key={index} course={course} onDelete={handleDeleteHideCourse} />
                    ))
                ) : (
                    <p>No courses available.</p>
                )}
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};






// ===================================================================================




// TutorsCreateCourse component to handle course creation
export const TutorsCreateCourse = () => {
    const { setTutorCoursesIconClick,  setTutorCreateCourseIconClick} = useContext(AppContext)

    const createCourseButton = useRef(null);
    const CourseCreationDialog = useRef(null);
    const validatorMessage = useRef(null);
    const makeCourseButton = useRef(null);

    const [TutorCourse, setTutorcourse] = useState({
        title: "",
        description: "",
    });
    const [submitClick, setSubmitClick] = useState(false);

    // Function to handle input value change
    const handleInputValueChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setTutorcourse({ ...TutorCourse, [name]: value });
    };

    // Function to validate input values
    const CourseDetailsValidator = () => {
        const { title, description } = TutorCourse;
        if (title.trim().length > 0 && description.trim().length > 0) {
            return true;
        } else {
            validatorMessage.current.textContent = "All fields are required";
            return false;
        }
    };

    // Function to handle course submission
    const SubmitCourseDetailsProcess = async (event) => {
        event.preventDefault();

        if (CourseDetailsValidator()) {
            try {
                const token = localStorage.getItem("token");
                setSubmitClick(true);
                const response = await fetch("http://127.0.0.1:7000/api/v1/user/tutor/new/course", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(TutorCourse),
                });

                if (!response.ok) {
                    setSubmitClick(false);
                    toast.error("Failed to create course", {
                        style: {
                            background: "rgb(255, 139, 139)",
                        },
                    });
                } else {
                    setSubmitClick(false);
                    toast.success("Successfully created course", {
                        style: {
                            background: "rgb(144, 234, 96)",
                        },
                    });
                    setTimeout(() => {
                        setTutorCoursesIconClick(true);
                        setTutorCreateCourseIconClick(false)
                    }, 2000)
                    CloseCourseCreationDialog()
                }

            } catch (err) {
                setSubmitClick(false);
                toast.error("Something went wrong", {
                    style: {
                        background: "rgb(255, 139, 139)",
                    },
                });
            }
        }
    }

    // Function to show the dialog for creating a new course
    const revealCourseCreationDialog = () => {
        CourseCreationDialog.current.showModal();
    };

    // Function to close the course creation dialog
    const CloseCourseCreationDialog = () => {
        CourseCreationDialog.current.close();
    };

    return (
        <>
            <h1>Tutors Create Courses</h1>
            <section className="Create-course-section">
                <div onClick={revealCourseCreationDialog} className="Create-course-Button">
                    <img ref={createCourseButton} src={CreateCourseIcon} alt="Pic" />
                </div>


                <dialog ref={CourseCreationDialog} className="CourseCreationDialog">
                    <div onClick={CloseCourseCreationDialog} className="CloseCourseCreationDialog">
                        <img src={Cancel} alt="cancel" />
                    </div>

                    <h1>What will this course be about?</h1>
                    <form onSubmit={SubmitCourseDetailsProcess}>
                        <label>
                            Course Title:
                            <input onChange={handleInputValueChange} name="title" value={TutorCourse.title} type="text" />
                        </label>
                        <br />
                        <label>
                            Course Description:
                            <textarea onChange={handleInputValueChange} name="description" value={TutorCourse.description}></textarea>
                        </label>
                        <div style={{ color: "red", display: "flex", justifyContent: "center", alignItems: "center" }} ref={validatorMessage}></div>
                        <br />
                        <div className="CourseCreationButtonContainer">
                            <button ref={makeCourseButton} disabled={submitClick} type="submit">
                                {submitClick ? <ButtonLoader /> : "Create"}
                            </button>
                        </div>
                    </form>
                </dialog>
                <Toaster position="top-center" reverseOrder={false} />
            </section>
        </>
    );
};

// ===========================================================================================




// TutorsInbox component to handle the inbox functionality
export const TutorsInbox = () => {
    return (
        <>
            <h1>Tutors Inbox</h1>
        </>
    );
};

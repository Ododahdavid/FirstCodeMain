import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import StudentDashboardNavbar from '../Components/StudentDashBoardComponents/StudentDashboardNavbar';

const CoursePage = () => {
    const { courseId } = useParams();  // This comes from the route parameter
    const navigate = useNavigate();
    const [courseDetails, setCourseDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`http://127.0.0.1:7000/api/v1/user/student/course/${courseId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                setCourseDetails(data);
            } catch (error) {
                console.error('Error fetching course details:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [courseId]);

    if (loading) return <div>Loading...</div>;
    if (error) return (
        <div>
            <p>Error: {error}</p>
            <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );
    if (!courseDetails) return (
        <div>
            <p>Course not found</p>
            <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );

    return (
        <>
            <StudentDashboardNavbar />
            <br />
            
            <div className="courseDetailPage">

                

                

                <section className={"courseDetailsContainer"}>

                    <div className={"courseDetailsSection"}>

                        <h1>{courseDetails.title}</h1>
                        <p>{courseDetails.description}</p>
                        <h3>Created By: {courseDetails.tutorId.lastname} {courseDetails.tutorId.firstname}</h3>
                    </div>

                    <div className={"courseStudentCount"}>
                        <h2>Total Students Enrolled for this course</h2>
                        <h1>{formatNumber(courseDetails.studentCount)}</h1>
                    </div>

                </section>



            </div>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </>
    );
};

export default CoursePage;
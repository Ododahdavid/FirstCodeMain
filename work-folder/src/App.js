import React, { Suspense } from "react"
import "./CSS/styles.css"
import "./CSS/PageLoader.css"
import "./CSS/ButonLoader.css"

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Footer from "./GeneralComponents/Footer";
import Loader from "./Loader/Loader.jsx"
import TutorSignUpFormPage from "./Pages/TutorSignUpFormPage.jsx";
import { AppcontextProvider } from "./GeneralComponents/ContextApi"

// Lazy imports
const HomePage = React.lazy(() => import("./Pages/HomePage"))
const StudentDashboard = React.lazy(() => import("./Pages/StudentDashboard"))
const TutorDashboard = React.lazy(() => import("./Pages/TutorDashboard"))
const SignUpQuestionPage = React.lazy(() => import("./Pages/SignUpQuestionPage"))
const StudentSignUpFormPage = React.lazy(() => import("./Pages/StudentSignUpFormPage"))
const LoginPage = React.lazy(() => import ("./Pages/LoginPage"))
const TutorViewCoursePage =React.lazy(()=> import ("./Pages/TutorViewCoursePage"))
const ForgotPasswordPage = React.lazy(() => import ("./Pages/ForgotPassword"))
const PasswordResetPage = React.lazy(() => import ("./Pages/PasswordReset"))

// importing my context API

function App() {
  return (
    <>
      <AppcontextProvider>
        <Router>
          <Suspense fallback={<Loader />}>

            <Routes>
              <Route path="/studentdashboard" element={<StudentDashboard />} />
              <Route path="/tutordashboard" element={<TutorDashboard />} />
              <Route path="/signupquestionpage" element={<SignUpQuestionPage />} />
              <Route path="/studentsignupformpage" element={<StudentSignUpFormPage />} />
              <Route path="/tutorsignupformpage" element={<TutorSignUpFormPage />} />
              <Route path="/loginformpage" element={<LoginPage />} />
              <Route path="/tutorviewcoursepage" element={<TutorViewCoursePage />} />
              <Route path="/tutorforgotpasswordpage" element={<ForgotPasswordPage />} />
              <Route path="/tutorresetpasswordpage" element={<PasswordResetPage />} />
              <Route path="/*" element={<HomePage />} />
            </Routes>
            <Footer />
          </Suspense>
        </Router>
      </AppcontextProvider>
    </>
  );
}

export default App;

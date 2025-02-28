// App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import JobList from "./pages/JobList";
import JobDetail from "./pages/JobDetail";
import CompanyDetail from "./pages/CompanyDetail";
import Profile from "./pages/Profile";
import InterviewPage from "./pages/InterviewPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SafetySections from "./pages/SafetySections";
import EmailVerifiedPage from "./pages/EmailVerifiedPage";
import RedirectPage from "./pages/RedirectPage";
import JobApplications from "./pages/JobApplications";
import DeleteAccount from "./components/DeleteAccount";
import ForgotPassword from "./components/ForgotPassword";
import ScrollToTop from "./components/ScrollToTop";
import AboutUs from "./components/Home/About/AboutUs";
import SplashScreen from "./pages/SplashScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const noPaths = ["/signup", "/login"];
  const noFooter = ["/profile"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds for loading screen

    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <SplashScreen isLoading={isLoading} />
      <div className="flex flex-col min-h-screen">
        {!isLoading && !noPaths.includes(location.pathname) && <Header />}
        <main className="flex-grow">
          <ScrollToTop/>
          {!isLoading && (
            <Routes>
              <Route path="*" element={<h1>Not Found</h1>} />
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/joblist" element={<JobList />} />
              <Route path="/jobdetail" element={<JobDetail />} />
              <Route path="/companydetail" element={<CompanyDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/safety" element={<SafetySections />} />
              <Route path="/forgot" element={<ForgotPassword />} />
              <Route path="/interview/:companyId" element={<InterviewPage />} />
              <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
              <Route path="/verify-email/:token" element={<EmailVerifiedPage />} />
              <Route path="/redirect" element={<RedirectPage />} />
              <Route path="/applications" element={<JobApplications />} />
              <Route path="/delete-account" element={<DeleteAccount />} />
              <Route path="/aboutus" element={<AboutUs />} />
            </Routes>
          )}
        </main>
        {!isLoading && !noPaths.includes(location.pathname) &&
          !noFooter.includes(location.pathname) && <Footer />}
      </div>
    </AuthProvider>
  );
}

export default App;

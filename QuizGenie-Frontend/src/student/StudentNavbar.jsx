import { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";

// Import your student pages
import AttemptQuiz from "./AttemptQuiz";
import ViewResults from "./ViewResults";
import Feedback from "./Feedback";
import { useAuth } from "../contextapi/AuthContext";
import StudentHome from "./StudentHome";

const StudentNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const {setIsStudentLoggedIn} = useAuth();

  const handleLogout = () => {
    // Optional: clear session/token
    setIsStudentLoggedIn(false);
    navigate("/studentlogin");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Navbar */}
      <div className="bg-indigo-600 p-4 shadow-md text-white">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Brand */}
          <Link to="/" className="text-2xl font-bold text-white">
            QuizGenie | Student
          </Link>

          {/* Hamburger */}
          <button onClick={toggleMenu} className="md:hidden text-white text-xl">
            {isOpen ? "✖" : "☰"}
          </button>

          {/* Nav Links */}
          <div
            className={`flex-col md:flex-row md:flex md:space-x-6 space-y-4 md:space-y-0 mt-4 md:mt-0 ${
              isOpen ? "flex" : "hidden"
            } md:items-center text-sm`}
          >
            <Link
              to="/studenthome"
              className="hover:text-blue-300 transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/student/attempt-quiz"
              className="hover:text-blue-300 transition"
              onClick={() => setIsOpen(false)}
            >
              Attempt Quiz
            </Link>
            <Link
              to="/student/view-results"
              className="hover:text-blue-300 transition"
              onClick={() => setIsOpen(false)}
            >
              View Results
            </Link>
            <Link
              to="/student/feedback"
              className="hover:text-blue-300 transition"
              onClick={() => setIsOpen(false)}
            >
              Feedback
            </Link>
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="px-4 py-1 border border-white text-white text-sm rounded-md hover:bg-white hover:text-indigo-600 transition duration-200 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Routes under StudentNavbar */}
      <Routes>
        <Route path="/studenthome" element={<StudentHome />} />
        <Route path="/student/attempt-quiz" element={<AttemptQuiz />} />
        <Route path="/student/view-results" element={<ViewResults />} />
        <Route path="/student/feedback" element={<Feedback />} />
      </Routes>
    </div>
  );
};

export default StudentNavbar;

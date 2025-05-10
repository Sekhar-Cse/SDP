import { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";

// Import your examiner pages
import CreateQuiz from "./CreateQuiz";
import ExaminerHome from "./ExaminerHome";
import { useAuth } from "../contextapi/AuthContext";

const ExaminerNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { setIsExaminerLoggedIn } = useAuth();

  const handleLogout = () => {
    setIsExaminerLoggedIn(false);
    navigate("/examinerlogin");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Navbar */}
      <div className="bg-indigo-600 p-4 shadow-md text-white">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Brand */}
          <Link to="/" className="text-2xl font-bold text-white">
            QuizGenie | Examiner
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
              to="/examinerhome"
              className="hover:text-blue-300 transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/examiner/create-quiz"
              className="hover:text-blue-300 transition"
              onClick={() => setIsOpen(false)}
            >
              Create Quiz
            </Link>
            <Link
              to="/examiner/view-quizzes"
              className="hover:text-blue-300 transition"
              onClick={() => setIsOpen(false)}
            >
              View Quizzes
            </Link>
            <Link
              to="/examiner/review-submissions"
              className="hover:text-blue-300 transition"
              onClick={() => setIsOpen(false)}
            >
              Review Submissions
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

      {/* Routes under ExaminerNavbar */}
      <Routes>
        <Route path="/examinerhome" element={<ExaminerHome />} />
        <Route path="/examiner/create-quiz" element={<CreateQuiz />} />
        {/* <Route path="/examiner/view-quizzes" element={<ViewQuizzes />} />
        <Route path="/examiner/review-submissions" element={<ReviewSubmissions />} /> */}
      </Routes>
    </div>
  );
};

export default ExaminerNavbar;

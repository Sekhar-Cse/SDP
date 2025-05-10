import { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "../contextapi/AuthContext";
import AddStudent from './AddStudent';
import AddExaminer from "./AddExaminer";
import CreateSection from "./CreateSection";
import ViewExaminers from "./ViewExaminers";
import ViewStudents from "./ViewStudents";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const { setIsAdminLoggedIn } = useAuth();

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    navigate("/adminlogin")
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div>
      <div className="bg-indigo-600 p-4 shadow-md text-white">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Brand */}
          <Link to="/" className="text-2xl font-bold text-white">
            QuizGenie | Admin
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
              to="/admin/add-student"
              className="hover:text-blue-300 transition"
              onClick={() => setIsOpen(false)}
            >
              Add Student
            </Link>
            <Link
              to="/admin/add-examiner"
              className="hover:text-blue-300 transition"
              onClick={() => setIsOpen(false)}
            >
              Add Examiner
            </Link>
            <Link
              to="/admin/create-section"
              className="hover:text-blue-300 transition"
              onClick={() => setIsOpen(false)}
            >
              Create Section
            </Link>

            {/* Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="hover:text-blue-300 transition flex items-center"
              >
                Manage Users ▾
              </button>
              {isDropdownOpen && (
                <div className="absolute bg-white text-indigo-600 mt-2 rounded-md shadow-lg w-40">
                  <Link
                    to="/admin/view-students"
                    className="block px-4 py-2 hover:bg-indigo-100"
                    onClick={() => {
                      setIsOpen(false);
                      setIsDropdownOpen(false);
                    }}
                  >
                    View All Students
                  </Link>
                  <Link
                    to="/admin/view-examiners"
                    className="block px-4 py-2 hover:bg-indigo-100"
                    onClick={() => {
                      setIsOpen(false);
                      setIsDropdownOpen(false);
                    }}
                  >
                    View All Examiners
                  </Link>
                </div>
              )}
            </div>

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

      <Routes>
        <Route path="/admin/add-student" element={<AddStudent />} />
        <Route path="/admin/add-examiner" element={<AddExaminer />} />
        <Route path="/admin/create-section" element={<CreateSection />} />
        {/* These below two routes you will need to create components for */}
        <Route path="/admin/view-students" element={<ViewStudents/>} />
        <Route path="/admin/view-examiners" element={<ViewExaminers/>} />
      </Routes>
    </div>
  );
};

export default AdminNavbar;

import { useState, useEffect, useRef } from 'react';
import { Link, Routes, Route } from 'react-router-dom';

import AdminLogin from '../admin/AdminLogin';
import ExaminerLogin from '../examiner/ExaminerLogin';
import Home from './Home';
import Contact from './Contact';
import StudentLogin from '../student/StudentLogin';
import About from './About';

const MainNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Hover events for dropdown
  const handleDropdownMouseEnter = () => setIsDropdownOpen(true);
  const handleDropdownMouseLeave = () => setIsDropdownOpen(false);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div>
      <div className="bg-indigo-600 p-4 shadow-md text-white">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Brand */}
          <Link to="/" className="text-2xl font-bold text-white cursor-pointer">
            QuizGenie
          </Link>

          {/* Hamburger */}
          <button onClick={toggleMenu} className="md:hidden text-white text-xl cursor-pointer">
            {isOpen ? '✖' : '☰'}
          </button>

          {/* Nav Links */}
          <div
            className={`flex-col md:flex-row md:flex md:space-x-6 space-y-4 md:space-y-0 mt-4 md:mt-0 ${
              isOpen ? 'flex' : 'hidden'
            } md:items-center text-sm`}
          >
            <Link
              to="/about"
              className="hover:text-blue-300 transition cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="hover:text-blue-300 transition cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            {/* Login Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={handleDropdownMouseLeave}
              ref={dropdownRef} // Attach ref to the dropdown container
            >
              <button
                className="px-4 py-1 border border-white text-white text-sm rounded-md hover:bg-white hover:text-indigo-600 transition duration-200 cursor-pointer"
              >
                Login ▾
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  className="absolute right-0 bg-white text-black rounded shadow-md z-10 w-56"
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  <Link
                    to="/studentlogin"
                    className="block w-full px-4 py-2 hover:bg-indigo-100 cursor-pointer"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Student Login
                  </Link>
                  <Link
                    to="/adminlogin"
                    className="block w-full px-4 py-2 hover:bg-indigo-100 cursor-pointer"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Admin Login
                  </Link>
                  <Link
                    to="/examinerlogin"
                    className="block w-full px-4 py-2 hover:bg-indigo-100 cursor-pointer"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Examiner Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Routes for Login and Other Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/studentlogin" element={<StudentLogin />} exact/>
        <Route path="/adminlogin" element={<AdminLogin />} exact/>
        <Route path="/examinerlogin" element={<ExaminerLogin />} exact/>
      </Routes>
    </div>
  );
};

export default MainNavbar;

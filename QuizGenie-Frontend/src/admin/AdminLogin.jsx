import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contextapi/AuthContext";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setIsAdminLoggedIn } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:2097/admin/check-credentials",
        null,
        {
          params: {
            username: formData.username,
            password: formData.password,
          },
        }
      );

      if (response.status === 200) {
        console.log("Admin Login Success:", response.data);
        setIsAdminLoggedIn(true);
        navigate("/adminhome");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 404) {
          setErrorMessage("Invalid Credentials");
        } else {
          setErrorMessage("Unexpected Error, please try again");
        }
      } else if (error.request) {
        setErrorMessage("No response from server");
      } else {
        setErrorMessage("Error in making request");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 px-6 py-10 bg-white shadow-lg rounded-xl max-w-md w-full animate-fadeIn">
        <h1 className="text-4xl font-bold text-gray-800">Admin Login</h1>
        <p className="text-sm text-gray-500">
          Login to manage users, content, and settings.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <div className="text-right">
            <a
              href="/admin/forgot-password"
              className="text-sm text-indigo-600 hover:underline cursor-pointer"
            >
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        {errorMessage && (
          <div className="text-red-500 text-sm mt-4">
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;

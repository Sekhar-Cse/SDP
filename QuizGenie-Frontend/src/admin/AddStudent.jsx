import { useState, useEffect } from "react";
import axios from "axios";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    sectionName: "", // NEW field
  });
  const [sections, setSections] = useState([]); // To store sections
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch sections when component mounts
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get("http://localhost:2097/section/viewallsections");
        console.log(response.data)
        setSections(response.data);

      } catch (err) {
        console.error("Failed to fetch sections", err);
      }
    };


    fetchSections();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {

      const requestBody = {
        username: formData.username,
        password: formData.password,
        name: formData.name,
        email: formData.email,
        section: {
          sectionName: formData.sectionName
        }
      };
      
      console.log(requestBody)
      const response = await axios.post(
        "http://localhost:2097/admin/add-student", 
        requestBody
      );
      if (response.status === 200) {
        setMessage("Student added successfully!");
        setFormData({ username: "", password: "", name: "", email: "", sectionName: "" });
      }
    } catch (err) {
      if (err.response) {
        setError("Failed to add student: " + err.response.data);
      } else {
        setError("Server Error, please try again later");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6 animate-fadeIn">
        <h2 className="text-3xl font-bold text-center text-indigo-600">
          Add Student
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Section Selection */}
          <div className="space-y-2">
            <label htmlFor="sectionName" className="text-sm font-medium text-gray-700">
              Section
            </label>
            <select
              name="sectionName"
              value={formData.sectionName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">-- Select Section --</option>
              {sections.map((section) => (
                <option key={section.sectionName} value={section.sectionName}>
                  {section.sectionName}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition cursor-pointer"
          >
            Add Student
          </button>
        </form>

        {message && (
          <div className="text-green-500 text-center font-semibold">{message}</div>
        )}
        {error && (
          <div className="text-red-500 text-center font-semibold">{error}</div>
        )}
      </div>
    </div>
  );
};

export default AddStudent;
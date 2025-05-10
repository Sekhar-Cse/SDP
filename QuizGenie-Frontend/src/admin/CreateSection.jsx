import { useState, useEffect } from "react";
import axios from "axios";

const CreateSection = () => {
  const [formData, setFormData] = useState({
    sectionName: "",
    examinerUsername: "", 
  });
  const [examinerList, setExaminerList] = useState([]); // To store examiner list
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchExaminers = async () => {
      try {
        const response = await axios.get("http://localhost:2097/admin/viewallexaminers");
        setExaminerList(response.data);
      } catch (err) {
        console.error("Failed to fetch examiners", err);
      }
    };

    fetchExaminers();
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
        sectionName: formData.sectionName,
        examiner: {         
          username: formData.examinerUsername
        }
      };
  
      console.log("Data being sent:", requestBody);  
  
      const response = await axios.post(
        "http://localhost:2097/section/create-section",
        requestBody
      );
      if (response.status === 200 || response.status === 201) {
        setMessage("Section created successfully!");
        setFormData({ sectionName: "", examinerUsername: "" }); 
      }
    } catch (err) {
      if (err.response) {
        setError("Failed to create section: " + err.response.data);
      } else {
        setError("Server Error, please try again later");
      }
    }
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6 animate-fadeIn">
        <h2 className="text-3xl font-bold text-center text-indigo-600">
          Create Section
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="sectionName" className="text-sm font-medium text-gray-700">
              Section Name
            </label>
            <input
              type="text"
              name="sectionName"
              value={formData.sectionName}
              onChange={handleChange}
              placeholder="Section Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Examiner Selection */}
          <div className="space-y-2">
            <label htmlFor="examinerUsername" className="text-sm font-medium text-gray-700">
              Examiner
            </label>
            <select
              name="examinerUsername"
              value={formData.examinerUsername}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">-- Select Examiner --</option>
              {examinerList.map((examiner) => (
                <option key={examiner.username} value={examiner.username}>
                  {examiner.username}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition cursor-pointer"
          >
            Create Section
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

export default CreateSection;

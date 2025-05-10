import { useEffect, useState } from "react";
import axios from "axios";

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:2097/admin/viewallstudents");
        console.log(response.data)
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-indigo-600 font-semibold">
        Loading Students...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-indigo-600 mb-6">All Students</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Username</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Section</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.username} className="border-b hover:bg-indigo-50">
                <td className="py-3 px-6">{student.username}</td>
                <td className="py-3 px-6">{student.name}</td>
                <td className="py-3 px-6">{student.email}</td>
                <td className="py-3 px-6">{student.sectionName || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewStudents;

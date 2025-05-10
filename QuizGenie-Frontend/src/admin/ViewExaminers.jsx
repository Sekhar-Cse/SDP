import { useEffect, useState } from "react";
import axios from "axios";

const ViewExaminers = () => {
  const [examiners, setExaminers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExaminers = async () => {
      try {
        const response = await axios.get("http://localhost:2097/admin/viewallexaminers");
        setExaminers(response.data);
      } catch (error) {
        console.error("Error fetching examiners:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExaminers();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-indigo-600 font-semibold">
        Loading Examiners...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-indigo-600 mb-6">All Examiners</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Username</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {examiners.map((examiner) => (
              <tr key={examiner.username} className="border-b hover:bg-indigo-50">
                <td className="py-3 px-6">{examiner.username}</td>
                <td className="py-3 px-6">{examiner.name}</td>
                <td className="py-3 px-6">{examiner.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewExaminers;

import { useEffect, useState } from "react";
import API from "../api";

export default function TPODashboard() {
  const [applications, setApplications] = useState([]);

  const fetchApps = () => {
    API.get("/applications/all") // You will create this backend route next
      .then(res => setApplications(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const updateStatus = (id, status) => {
    API.put(`/applications/${id}/status`, { status })
      .then(() => fetchApps())
      .catch(err => console.error(err));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Applications</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Student</th>
            <th className="p-2 border">Job</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app._id}>
              <td className="p-2 border">{app.student?.name}</td>
              <td className="p-2 border">{app.job?.title}</td>
              <td className="p-2 border">{app.status}</td>
              <td className="p-2 border">
                <button className="px-2 bg-blue-600 text-white mr-1"
                  onClick={() => updateStatus(app._id, "shortlisted")}>
                  Shortlist
                </button>

                <button className="px-2 bg-green-600 text-white mr-1"
                  onClick={() => updateStatus(app._id, "selected")}>
                  Select
                </button>

                <button className="px-2 bg-red-600 text-white"
                  onClick={() => updateStatus(app._id, "rejected")}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

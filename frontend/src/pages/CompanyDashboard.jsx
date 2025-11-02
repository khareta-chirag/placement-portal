import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function CompanyDashboard(){
  const [jobs,setJobs] = useState([]);

  useEffect(()=> { load(); }, []);
  async function load(){ try{ const res = await API.get("/jobs/my"); setJobs(res.data); } catch(e){ console.error(e); } }

  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Company Dashboard</h2>
        <Link to="/company/post" className="bg-primary-500 px-4 py-2 rounded-md text-white">Post Job</Link>
      </div>

      <div className="space-y-4">
        {jobs.map(j=>(
          <div key={j._id} className="card flex justify-between items-center">
            <div>
              <div className="font-semibold">{j.title}</div>
              <div className="text-gray-400 text-sm">{j.location}</div>
            </div>
            <div className="text-gray-300">{j.salary}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { decodeToken } from "../utils/auth";

export default function JobList(){
  const [jobs,setJobs] = useState([]);
  const [applied,setApplied] = useState([]);
  const [q,setQ] = useState("");
  const [loc,setLoc] = useState("");
  const [loading,setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = decodeToken(token);

  useEffect(()=> {
    if(!token) return navigate("/login");
    load();
  }, []);

  async function load(){
    setLoading(true);
    try {
      const [jobsRes, appsRes] = await Promise.all([
        API.get("/jobs"),
        API.get("/applications/my").catch(()=>({data:[]}))
      ]);
      setJobs(jobsRes.data || []);
      setApplied((appsRes.data||[]).map(a=>a.job));
    } catch(e){ console.error(e); }
    setLoading(false);
  }

  async function apply(jobId){
    try{
      await API.post(`/applications/apply/${jobId}`, {});
      await load();
    }catch(e){ alert(e.response?.data?.message || "Failed to apply"); }
  }

  const locations = Array.from(new Set(jobs.map(j=>j.location))).filter(Boolean);

  const filtered = jobs.filter(j=>{
    const s = q.trim().toLowerCase();
    if(s && !(j.title.toLowerCase().includes(s) || j.description.toLowerCase().includes(s) || (j.location||"").toLowerCase().includes(s))) return false;
    if(loc && (j.location||"").toLowerCase() !== loc.toLowerCase()) return false;
    return true;
  });

  return (
    <div className="page-container">
      <motion.div initial={{opacity:0, y:6}} animate={{opacity:1,y:0}} className="mb-8">
        <h1 className="text-4xl font-bold text-white">Find Your Next Role</h1>
        <p className="text-gray-300 mt-2">Browse curated internships & jobs posted by companies.</p>
      </motion.div>

      <div className="flex gap-4 mb-8">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search jobs, location or skills" className="input px-4 py-3 rounded-lg w-full" />
        <select value={loc} onChange={e=>setLoc(e.target.value)} className="input px-4 py-3 rounded-lg">
          <option value="">All locations</option>
          {locations.map((l,i)=>(<option key={i} value={l}>{l}</option>))}
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({length:6}).map((_,i)=>(
            <div key={i} className="card p-6 animate-pulse h-44 rounded-lg" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-gray-300">No jobs found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(job=>(
            <motion.div key={job._id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.3}} className="card">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                  <p className="text-sm text-gray-300 mt-1">{job.company?.name || 'Company'}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">{new Date(job.lastDate).toLocaleDateString()}</div>
                  <div className="mt-2 text-primary-500 font-semibold">{job.salary}</div>
                </div>
              </div>

              <p className="text-gray-300 mt-4 line-clamp-3">{job.description}</p>

              <div className="mt-4 flex gap-3">
                {applied.includes(job._id) ? (
                  <button disabled className="px-4 py-2 rounded-md bg-gray-600 text-white">Applied</button>
                ) : (
                  <button onClick={()=>apply(job._id)} className="px-4 py-2 rounded-md bg-primary-500 text-white hover:scale-[1.02]">Apply Now</button>
                )}
                <button className="px-3 py-2 rounded-md border border-white/6 text-white/80">Details</button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

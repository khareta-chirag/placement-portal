import { useEffect, useState } from "react";
import API from "../api";
import { motion } from "framer-motion";

export default function StudentDashboard(){
  const [apps,setApps] = useState([]);

  useEffect(()=>{ load(); }, []);
  async function load(){
    try{ const res = await API.get("/applications/my"); setApps(res.data); } catch(e){ console.error(e); }
  }

  return (
    <div className="page-container">
      <motion.h2 initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className="text-3xl font-bold mb-4">My Applications</motion.h2>

      <div className="space-y-4">
        {apps.length===0 && <div className="card text-gray-300 p-6">You haven't applied to any jobs yet.</div>}
        {apps.map(a=>(
          <div key={a._id} className="card flex justify-between items-center">
            <div>
              <div className="text-white font-semibold">{a.job?.title}</div>
              <div className="text-gray-400 text-sm">{a.job?.company?.name || 'Company'}</div>
            </div>
            <div className={`px-3 py-1 rounded-full ${a.status==="selected"? "bg-green-500":"bg-yellow-400"}`}>
              {a.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

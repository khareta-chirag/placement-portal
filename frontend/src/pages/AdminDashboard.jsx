import { useEffect, useState } from "react";
import API from "../api";

export default function AdminDashboard(){
  const [users,setUsers] = useState([]);

  useEffect(()=>{ load(); }, []);
  async function load(){ try{ const res = await API.get("/users"); setUsers(res.data); } catch(e){ console.error(e); } }

  return (
    <div className="page-container">
      <h2 className="text-3xl font-bold mb-4">Admin Panel</h2>
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400">
              <th className="py-3">Name</th><th>Email</th><th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u=>(
              <tr key={u._id} className="border-t border-white/6">
                <td className="py-3">{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

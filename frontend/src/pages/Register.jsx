import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function Register(){
  const nav = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", password:"", role:"student" });
  const [busy,setBusy] = useState(false);

  const change = e => setForm({...form,[e.target.name]: e.target.value});

  const submit = async (e)=> {
    e.preventDefault();
    setBusy(true);
    try {
      await API.post("/auth/register", form);
      toast.success("Account created — please login");
      nav("/login");
    } catch(e){
      toast.error(e.response?.data?.message || "Register failed");
    } finally { setBusy(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div initial={{y:8,opacity:0}} animate={{y:0,opacity:1}} className="max-w-md w-full card">
        <h2 className="text-2xl font-semibold mb-2">Create account</h2>
        <form onSubmit={submit} className="space-y-3">
          <input name="name" onChange={change} placeholder="Full name" className="input px-4 py-3 rounded-md w-full" required />
          <input name="email" onChange={change} placeholder="Email" className="input px-4 py-3 rounded-md w-full" required />
          <input name="password" onChange={change} type="password" placeholder="Password" className="input px-4 py-3 rounded-md w-full" required />
          <select name="role" onChange={change} className="input px-4 py-3 rounded-md w-full">
            <option value="student">Student</option>
            <option value="company">Company</option>
          </select>

          <button disabled={busy} className="w-full bg-primary-500 py-3 rounded-md text-white">{busy? "Creating..." : "Create account"}</button>
        </form>
      </motion.div>
    </div>
  );
}

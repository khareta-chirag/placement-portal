import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { decodeToken } from "../utils/auth";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

export default function Login(){
  const nav = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [busy,setBusy] = useState(false);

  const submit = async (e)=>{
    e.preventDefault();
    setBusy(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      const { token } = res.data;
      localStorage.setItem("token", token);
      const user = decodeToken(token);
      toast.success("Welcome back!");
      if(user?.role === "student") nav("/student");
      else if(user?.role === "company") nav("/company");
      else if(user?.role === "admin") nav("/admin");
      else nav("/");
    } catch(e){
      toast.error(e.response?.data?.message || "Login failed");
    } finally { setBusy(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div initial={{scale:0.98,opacity:0}} animate={{scale:1,opacity:1}} className="max-w-md w-full card">
        <h2 className="text-2xl font-semibold mb-2">Sign in</h2>
        <p className="text-sm text-gray-300 mb-6">Access your account</p>

        <form onSubmit={submit} className="space-y-3">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="input px-4 py-3 rounded-md w-full" required />
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="input px-4 py-3 rounded-md w-full" required />
          <button disabled={busy} className="w-full bg-primary-500 py-3 rounded-md text-white">{busy ? "Signing in..." : "Sign in"}</button>
        </form>

        <p className="mt-4 text-sm text-gray-300">New? <Link to="/register" className="text-primary-500">Create account</Link></p>
      </motion.div>
    </div>
  );
}

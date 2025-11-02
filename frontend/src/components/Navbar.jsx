import { Link, useNavigate } from "react-router-dom";
import { decodeToken } from "../utils/auth";
import { motion } from "framer-motion";

export default function Navbar(){
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const user = decodeToken(token);

  const logout = ()=>{
    localStorage.removeItem("token");
    nav("/login");
  };

  return (
    <motion.header initial={{y:-20,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.35}} className="fixed top-0 left-0 right-0 z-40">
      <div className="bg-white/6 backdrop-blur-sm border-b border-white/6">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-tr from-primary-500 to-primary-700 shadow-purple-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z" fill="white"/></svg>
            </div>
            <div className="text-white font-semibold text-lg">Placement Portal</div>
          </Link>

          <nav className="flex items-center gap-6">
            <Link className="text-sm text-white/80 hover:text-white" to="/">Jobs</Link>

            {!user && <>
              <Link className="text-sm text-white/80 hover:text-white" to="/login">Login</Link>
              <Link className="bg-primary-500 px-4 py-1 rounded-md text-white hover:opacity-95" to="/register">Register</Link>
            </>}

            {user && user.role === "student" && (
              <>
                <Link className="text-sm text-white/80 hover:text-white" to="/student">Dashboard</Link>
                <button onClick={logout} className="bg-red-600 px-3 py-1 rounded text-white">Logout</button>
              </>
            )}

            {user && user.role === "company" && (
              <>
                <Link className="text-sm text-white/80 hover:text-white" to="/company">Company</Link>
                <Link to="/company/post" className="bg-primary-500 px-4 py-1 rounded-md text-white">Post Job</Link>
                <button onClick={logout} className="bg-red-600 px-3 py-1 rounded text-white">Logout</button>
              </>
            )}

            {user && user.role === "admin" && (
              <>
                <Link className="text-sm text-white/80 hover:text-white" to="/admin">Admin</Link>
                <button onClick={logout} className="bg-red-600 px-3 py-1 rounded text-white">Logout</button>
              </>
            )}
          </nav>
        </div>
      </div>
    </motion.header>
  );
}

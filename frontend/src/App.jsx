import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import JobList from "./pages/JobList";
import StudentDashboard from "./pages/StudentDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import PostJob from "./pages/PostJob";
import AdminDashboard from "./pages/AdminDashboard";

export default function App(){
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/student" element={<ProtectedRoute role="student"><StudentDashboard/></ProtectedRoute>} />
        <Route path="/company" element={<ProtectedRoute role="company"><CompanyDashboard/></ProtectedRoute>} />
        <Route path="/company/post" element={<ProtectedRoute role="company"><PostJob/></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

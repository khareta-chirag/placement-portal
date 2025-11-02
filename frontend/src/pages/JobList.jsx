import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (location === "" ||
        job.location.toLowerCase().includes(location.toLowerCase()))
  );

  const handleApply = () => {
    if (!resume) {
      alert("Please upload your resume before applying.");
      return;
    }
    alert(`✅ Application submitted for ${selectedJob.title}`);
    setSelectedJob(null);
    setResume(null);
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Hero Section */}
      
      <section className="relative bg-gradient-to-r from-blue-800 via-purple-800 to-indigo-900 text-center py-20 px-4 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1500&q=80"
          alt="Career growth"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold mb-3 drop-shadow-lg">
            Find Your Dream Job
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Browse curated internships & jobs from top companies.
          </p>
        </div>
      </section>

      {/* Search Filters */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 py-8 px-4">
        <input
          type="text"
          placeholder="Search jobs, role or skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-3 rounded-xl bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <input
          type="text"
          placeholder="Filter by location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full md:w-1/3 px-4 py-3 rounded-xl bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        />
      </div>

      {/* Job Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 pb-16">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <motion.div
              key={job._id}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900/60 border border-gray-800 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm hover:shadow-2xl"
            >
              <div className="relative">
                <img
                  src={
                    job.companyLogo ||
                    `https://logo.clearbit.com/${(job.companyName ||
                      "example").toLowerCase().replace(/\s+/g, "")}.com`
                  }
                  alt="Company Logo"
                  className="w-full h-40 object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-1 text-blue-400">
                  {job.title}
                </h2>
                <p className="text-sm text-gray-400">
                  {job.companyName || "Company"}
                </p>
                <p className="text-sm text-gray-500 my-2">
                  📍 {job.location || "Location not specified"}
                </p>
                <p className="text-sm text-gray-400 mb-4">
                  💰 {job.salary ? `${job.salary} LPA` : "Salary undisclosed"}
                </p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="text-blue-400 hover:underline text-sm"
                  >
                    Details →
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-all">
                    Apply
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-3">No jobs found.</p>
        )}
      </div>

      {/* Job Details Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 p-8 rounded-2xl max-w-lg w-full shadow-2xl border border-gray-700"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-2 text-blue-400">
                {selectedJob.title}
              </h2>
              <p className="text-gray-400 mb-4">
                {selectedJob.companyName || "Company"} —{" "}
                {selectedJob.location || "Location"}
              </p>
              <p className="text-gray-300 mb-6">
                {selectedJob.description || "No detailed description available."}
              </p>
              <div className="mb-4">
                <label className="block text-gray-400 mb-1 text-sm">
                  Upload Resume
                </label>
                <input
                  type="file"
                  onChange={(e) => setResume(e.target.files[0])}
                  className="w-full bg-gray-800 rounded-lg text-gray-100 px-3 py-2"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedJob(null)}
                  className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all"
                >
                  Close
                </button>
                <button
                  onClick={handleApply}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all"
                >
                  Apply Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

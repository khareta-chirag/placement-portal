const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Job = require("./models/Job");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

const jobs = [
  {
    title: "Software Engineer Intern",
    description: "Work with React and Node to build web apps.",
    salary: "5 LPA",
    location: "Remote",
    lastDate: "2025-12-31"
  },
  {
    title: "Data Analyst Trainee",
    description: "Analyze business data and generate reports.",
    salary: "4.5 LPA",
    location: "Bangalore",
    lastDate: "2025-12-20"
  },
  {
    title: "Frontend Developer",
    description: "Create modern UIs using React JS.",
    salary: "6 LPA",
    location: "Hyderabad",
    lastDate: "2025-12-15"
  }
];

async function seedJobs() {
  await Job.deleteMany(); 
  await Job.insertMany(jobs);
  console.log("✅ Jobs Inserted Successfully!");
  mongoose.disconnect();
}

seedJobs();

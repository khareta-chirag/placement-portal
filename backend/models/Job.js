import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  salary: String,
  eligibilityCriteria: Object,
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lastDate: Date,
  interviewDate: Date,
  createdAt: { type: Date, default: Date.now },
});

const Job = mongoose.model("Job", JobSchema);
export default Job;

import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  resumeLink: String,
  status: {
    type: String,
    enum: ["applied", "shortlisted", "rejected", "selected"],
    default: "applied",
  },
  appliedAt: { type: Date, default: Date.now },
  offerLetter: String,
});

const Application = mongoose.model("Application", ApplicationSchema);
export default Application;

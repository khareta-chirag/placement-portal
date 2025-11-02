import express from "express";
import Application from "../models/Application.js";
import auth, { isStudent } from "../middleware/auth.js";

const router = express.Router();

// ✅ Apply for a job
router.post("/apply/:jobId", auth, isStudent, async (req, res) => {
  try {
    const already = await Application.findOne({
      job: req.params.jobId,
      student: req.user.id,
    });

    if (already)
      return res.status(409).json({ message: "Already Applied ✅" });

    const application = await Application.create({
      job: req.params.jobId,
      student: req.user.id,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Student's applied jobs
router.get("/my", auth, isStudent, async (req, res) => {
  try {
    const apps = await Application.find({ student: req.user.id })
      .populate("job")
      .populate("student", "name email");

    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

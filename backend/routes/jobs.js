import express from "express";
import Job from "../models/Job.js";
import Company from "../models/Company.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// ✅ Create Job (Company / TPO)
router.post("/", protect, authorize("company", "tpo"), async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get All Jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

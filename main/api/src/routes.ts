import { Router } from "express";

import { getStatus } from "./controllers/status";
import { createJob, getJobs, getJob, deleteJob, updateJob } from "./controllers/jobs";

export const router = Router();

router.get("/status", getStatus);
router.get("/jobs", getJobs)
router.post("/jobs", createJob);
router.get("/jobs/:jobId", getJob);
router.delete("/jobs/:jobId", deleteJob);
router.put("/jobs/:jobId", updateJob);

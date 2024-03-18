import { Router } from "express";

import { getStatusHandler } from "./controllers/status";
import {
  createJobHandler,
  getJobsHandler,
  getJobHandler,
  deleteJobHandler,
  updateJobHandler,
} from "./controllers/jobs";

export const router = Router();

router.get("/status", getStatusHandler);
router.get("/jobs", getJobsHandler);
router.post("/jobs", createJobHandler);
router.get("/jobs/:jobId", getJobHandler);
router.delete("/jobs/:jobId", deleteJobHandler);
router.put("/jobs/:jobId", updateJobHandler);

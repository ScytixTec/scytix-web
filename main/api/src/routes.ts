import { Router } from "express";

import { verifyToken } from "./middlewares/verify-token";
import { getStatusHandler } from "./controllers/status";
import {
  getJobHandler,
  getJobsHandler,
  createJobHandler,
  deleteJobHandler,
  updateJobHandler,
} from "./controllers/jobs";

export const router = Router();

router.get("/status", getStatusHandler);
router.get("/jobs", verifyToken, getJobsHandler);
router.post("/jobs", verifyToken, createJobHandler);
router.get("/jobs/:jobId", verifyToken, getJobHandler);
router.delete("/jobs/:jobId", verifyToken, deleteJobHandler);
router.put("/jobs/:jobId", verifyToken, updateJobHandler);

import { Router, type RequestHandler } from "express";

import { getStatusHandler } from "./controllers/status";
import {
  createJobHandler,
  getJobsHandler,
  getJobHandler,
  deleteJobHandler,
  updateJobHandler,
} from "./controllers/jobs";

export const router = Router();

router.get("/status", getStatusHandler as unknown as RequestHandler);
router.get("/jobs", getJobsHandler as unknown as RequestHandler);
router.post("/jobs", createJobHandler as unknown as RequestHandler);
router.get("/jobs/:jobId", getJobHandler as unknown as RequestHandler);
router.delete("/jobs/:jobId", deleteJobHandler as unknown as RequestHandler);
router.put("/jobs/:jobId", updateJobHandler as unknown as RequestHandler);

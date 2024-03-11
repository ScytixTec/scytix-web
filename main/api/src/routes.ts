import { Router, type RequestHandler } from "express";

import { verifyToken } from "./middlewares/verify-token";
import { getStatus } from "./controllers/status";

export const router = Router();

router.get("/status", verifyToken as unknown as RequestHandler, getStatus);

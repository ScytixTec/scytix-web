import { Router } from "express";

import { verifyToken } from "./middlewares/verify-token";
import { getStatus } from "./controllers/status";

export const router = Router();

router.get("/status", verifyToken, getStatus);

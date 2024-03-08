import { Router } from "express";

import { getStatus } from "./controllers/status";

export const router = Router();

router.get("/status", getStatus);

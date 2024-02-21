import { Router } from "express";

const router = Router();

import { getStatus } from "./controllers/status";

router.get("/status", getStatus);

export default router;

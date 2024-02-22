import { Router } from "express";

import { getStatus, getStatusById } from "./controllers/status";

const router = Router();

router.get("/status", getStatus);
router.get("/status/:id", getStatusById);

export default router;

import { Router } from "express";

const router = Router();

import { getStatus } from "./controllers/status";

// const statusController = require('./controllers/status/index');

router.get('/api/status', getStatus)


export default router;
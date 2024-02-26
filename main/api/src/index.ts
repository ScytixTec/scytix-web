import express from "express";
import serverless from "serverless-http";

import routes from "./routes";

const app = express();
app.use("/api", routes);

export const handler = serverless(app);

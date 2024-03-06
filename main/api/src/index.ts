import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import express from "express";
import serverless from "serverless-http";

import routes from "./routes";

const app = express();
app.use("/api", routes);

const expressHandler = serverless(app);

export const handler: APIGatewayProxyHandlerV2 = async (event, context) => {
  return await expressHandler(event, context);
};

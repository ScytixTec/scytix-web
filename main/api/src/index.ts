import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import express from "express";
import serverless from "serverless-http";

import { initLogger } from "@scytix/logger";
import { initDynamoClient } from "@scytix/dynamo";

import { config } from "./config";
import routes from "./routes";

const app = express();
app.use("/api", routes);

const expressHandler = serverless(app);

export const handler: APIGatewayProxyHandlerV2 = async (event, context) => {
  const logger = initLogger(config.logger);

  initDynamoClient({
    ...config.dynamo,
    logger,
  });

  try {
    return await expressHandler(event, context);
  } finally {
    logger.close();
  }
};

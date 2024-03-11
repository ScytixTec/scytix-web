import { type APIGatewayProxyHandlerV2 } from "aws-lambda";
import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import { initLogger } from "@scytix/logger";
import { initDynamoClient } from "@scytix/dynamo";

import { initCognitoClient } from "./models/cognito";
import { config } from "./config";
import { router } from "./routes";

const options: cors.CorsOptions = {
  origin: config.cors.allowedOrigins,
};

const app = express();
app.use("/api", router);
app.use(cors(options));

const expressHandler = serverless(app);

export const handler: APIGatewayProxyHandlerV2 = async (event, context) => {
  const logger = initLogger(config.logger);

  initDynamoClient({
    ...config.dynamo,
    logger,
  });

  initCognitoClient({
    clientId: config.cognito.appClientId,
    userPoolId: config.cognito.userPoolId,
    tokenUse: "access",
    scope: "read",
  });

  try {
    return await expressHandler(event, context);
  } finally {
    logger.close();
  }
};

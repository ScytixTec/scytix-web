import { type Request, type Response, type NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { getLogger } from "@scytix/logger";

import { getCognitoClient } from "../models/cognito";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const logger = getLogger();
  const cognitoClient = getCognitoClient();
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    logger.error({
      message: "Authorization header is required.",
    });

    res.status(StatusCodes.UNAUTHORIZED).send();
    return;
  }

  try {
    await cognitoClient.verify(authorizationHeader);
    next();
  } catch (error) {
    logger.error({
      message: "Cognito error authentication.",
      error,
    });

    res.status(StatusCodes.UNAUTHORIZED).send();
  }
};

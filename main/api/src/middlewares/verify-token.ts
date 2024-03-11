import { type Request, type Response, type NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { getCognitoClient } from "../models/cognito";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    res.status(StatusCodes.UNAUTHORIZED);
    return;
  }
  try {
    await getCognitoClient().verify(authorizationHeader);
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED);
  }
};

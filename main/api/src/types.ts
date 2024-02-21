import { Request, Response } from "express";

export type BasicControllerType = (params: {
  req: Request;
  res: Response;
}) => void;

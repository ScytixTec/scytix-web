import { Request, Response } from "express";

export type BasicControllerType = (req: Request, res: Response) => void;

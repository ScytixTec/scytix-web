import { type Request, type Response } from "express";

export interface JobRequestParams {
  jobId: string;
}

interface JobRequest extends Request {
  body: string;
}

export type BasicControllerType = (req: Request, res: Response) => void;
export type AsyncControllerType = (
  req: Request,
  res: Response,
) => Promise<void>;
export type JobControllerTypeWithBody = (
  req: JobRequest,
  res: Response,
) => Promise<void>;
export type JobControllerTypeWithJobId = (
  req: Request<JobRequestParams>,
  res: Response,
) => Promise<void>;

export interface Job {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  timeCreated: string;
  timeUpdated: string;
}

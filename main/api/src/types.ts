import { type Request, type Response } from "express";

interface IParam {
  jobId: string
}

interface IJobBody {
  title: string;
  description: string;
  isActive: boolean,
}

interface ILoginRequest extends Request {
  body: IJobBody;
}

export type BasicControllerType = (req: Request, res: Response) => void;
export type JobControllerTypeWithBody = (req: ILoginRequest, res: Response) => void;
export type JobControllerTypeWithJobId = (req: Request<IParam>, res: Response) => void;


export interface Job {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  timeCreated: string;
  timeUpdated: string;
}

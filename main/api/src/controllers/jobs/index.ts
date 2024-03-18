import { StatusCodes } from "http-status-codes";
import { type Request, type Response } from "express";

import { JobsSchema, JobsUpdateSchema } from "./job-zod-schema";
import {
  createJob,
  type CreateJobParams,
  getJobs,
  getJob,
  deleteJob,
  type UpdateJobParams,
  updateJob,
} from "../../models/jobs";

interface StringifiedBodyRequest extends Request {
  body: string;
}

export const createJobHandler = async (
  req: StringifiedBodyRequest,
  res: Response,
): Promise<void> => {
  const data = JSON.parse(req.body) as CreateJobParams;

  const createJobParams = JobsSchema.safeParse(data);

  if (!createJobParams.success) {
    res.status(StatusCodes.BAD_REQUEST).send({
      errors: createJobParams.error.format(),
    });

    return;
  }

  res.status(StatusCodes.OK).json({
    id: await createJob(data),
  });
};

export const getJobsHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  await getJobs();
  res.setHeader("Content-Range", "jobs 0-1/1");
  res.status(StatusCodes.OK).json([]);
};

export const getJobHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const jobItem = await getJob(req.params.jobId);
  res.status(StatusCodes.OK).json(jobItem);
};

export const deleteJobHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  res.status(StatusCodes.OK).json(await deleteJob(req.params.jobId));
};

export const updateJobHandler = async (
  req: StringifiedBodyRequest,
  res: Response,
): Promise<void> => {
  const data = JSON.parse(req.body) as UpdateJobParams;

  const updateJobParams = JobsUpdateSchema.safeParse(data);
  if (!updateJobParams.success) {
    res.status(StatusCodes.BAD_REQUEST).send({
      errors: updateJobParams.error.format(),
    });

    return;
  }
  res.status(StatusCodes.OK).json(await updateJob(data));
};

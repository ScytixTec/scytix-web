import { StatusCodes } from "http-status-codes";

import {
  type JobControllerTypeWithJobId,
  type AsyncControllerType,
  type JobControllerTypeWithBody,
} from "../../types";
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

export const createJobHandler: JobControllerTypeWithBody = async (req, res) => {
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

export const getJobsHandler: AsyncControllerType = async (req, res) => {
  await getJobs();
  res.setHeader("Content-Range", "jobs 0-1/1");
  res.status(StatusCodes.OK).json([]);
};

export const getJobHandler: JobControllerTypeWithJobId = async (req, res) => {
  const jobId = req.params.jobId;
  const item = await getJob(jobId);
  res.status(StatusCodes.OK).json({ id: jobId, ...item });
};

export const deleteJobHandler: JobControllerTypeWithJobId = async (
  req,
  res,
) => {
  const jobId = req.params.jobId;
  res.status(StatusCodes.OK).json(await deleteJob(jobId));
};

export const updateJobHandler: JobControllerTypeWithBody = async (req, res) => {
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

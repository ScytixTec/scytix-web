import { StatusCodes } from "http-status-codes";
import { type ZodIssue } from "zod";

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

  const result = JobsSchema.safeParse(data);

  if (!result.success) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({
        errors: result.error.format((issue: ZodIssue) => ({
          title: issue.message,
          date: new Date(),
          tags: { message: issue.code },
        })),
      })
      .end();
  }

  try {
    const id = await createJob(data);
    res.status(StatusCodes.OK).json({ id });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({ error });
  }
};

export const getJobsHandler: AsyncControllerType = async (req, res) => {
  try {
    await getJobs();
    res.setHeader("Content-Range", "jobs 0-1/1");
    res.status(StatusCodes.OK).json([]);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({ status: "BAD_REQUEST" });
  }
};

export const getJobHandler: JobControllerTypeWithJobId = async (req, res) => {
  const jobId = req.params.jobId;
  try {
    const item = await getJob(jobId);
    res.status(StatusCodes.OK).json({ id: jobId, ...item });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({ status: "BAD_REQUEST" });
  }
};

export const deleteJobHandler: JobControllerTypeWithJobId = async (
  req,
  res,
) => {
  const jobId = req.params.jobId;
  try {
    const item = await deleteJob(jobId);
    res.status(StatusCodes.OK).json({ item });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({ status: "BAD_REQUEST" });
  }
};

export const updateJobHandler: JobControllerTypeWithBody = async (req, res) => {
  const data = JSON.parse(req.body) as UpdateJobParams;

  const result = JobsUpdateSchema.safeParse(data);
  if (!result.success) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({
        errors: result.error.format((issue: ZodIssue) => ({
          title: issue.message,
          date: new Date(),
          tags: { message: issue.code },
        })),
      })
      .end();
  }

  try {
    const updatedItem = await updateJob(data);
    res.status(StatusCodes.OK).json(updatedItem);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({ status: "BAD_REQUEST" });
  }
};

import { StatusCodes } from "http-status-codes";

import {
  type JobControllerTypeWithJobId,
  type BasicControllerType,
  type JobControllerTypeWithBody,
} from "../../types";
import { JobsSchema } from "./job-zod-schema";
import {
  createDynamoJob,
  type CreateJobParams,
  getDynamoJobs,
  getDynamoJob,
  deleteDynamoJob,
  type UpdateJobParams,
  updateDynamoJob,
} from "../../models/jobs";

export const createJob: BasicControllerType = async (req, res) => {
  const data: CreateJobParams = JSON.parse(req.body);

  try {
    JobsSchema.parse(data);
    const id = await createDynamoJob(data);
    console.log(id);
    res.status(StatusCodes.OK).json({ id });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({ error });
  }
};

export const getJobs: BasicControllerType = async (req, res) => {
  try {
    const data = await getDynamoJobs();
    res.setHeader("Content-Range", "jobs 0-1/1");
    res.status(StatusCodes.OK).json([]);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({ status: "BAD_REQUEST" });
  }
};

export const getJob: JobControllerTypeWithJobId = async (req, res) => {
  const jobId = req.params.jobId;
  console.log(jobId);
  try {
    const item = await getDynamoJob(jobId);
    res.status(StatusCodes.OK).json({ id: jobId, ...item });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({ status: "BAD_REQUEST" });
  }
};

export const deleteJob: JobControllerTypeWithJobId = async (req, res) => {
  const jobId = req.params.jobId;
  try {
    const item = await deleteDynamoJob(jobId);
    res.status(StatusCodes.OK).json({ item });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({ status: "BAD_REQUEST" });
  }
};

export const updateJob: BasicControllerType = async (req, res) => {
  const data: UpdateJobParams = JSON.parse(req.body);

  try {
    JobsSchema.parse(data);
    const updatedItem = await updateDynamoJob(data);
    res.status(StatusCodes.OK).json(updatedItem);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({ status: "BAD_REQUEST" });
  }
};

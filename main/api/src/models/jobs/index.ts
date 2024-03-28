import { db } from "../../db/config";
import {
  createJobQuery,
  getJobsQuery,
  getJobQuery,
  deleteJobQuery,
  updateJobQuery,
} from "../../queries/jobs";

export interface CreateJobParams {
  description: string;
  title: string;
  isActive: boolean;
}

export type UpdateJobParams = CreateJobParams & {
  dateAdded: string;
  dateUpdated: string;
  id: string;
};

export interface Job {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  timeCreated: string;
  timeUpdated: string;
}

export const createJob = async (params: CreateJobParams): Promise<number> => {
  return await db.one(createJobQuery, {
    ...params,
    dateAdded: new Date().toISOString(),
    dateUpdated: new Date().toISOString(),
  });
};

export const getJobs = async (): Promise<Job[]> => {
  return await db.any(getJobsQuery);
};

export const getJob = async (id: string): Promise<Job | undefined> => {
  return await db.one(getJobQuery, [id]);
};

export const deleteJob = async (id: string): Promise<void> => {
  await db.none(deleteJobQuery, [id]);
};

export const updateJob = async (params: UpdateJobParams): Promise<void> => {
  await db.none(updateJobQuery, {
    ...params,
    dateUpdated: new Date().toISOString(),
  });
};

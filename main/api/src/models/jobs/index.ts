import { randomUUID } from "node:crypto";
import {
  putDynamoItem,
  queryDynamo,
  getDynamoItem,
  deleteDynamoItem,
  type ResultSet,
} from "@scytix/dynamo";
import { createUrn, UrnResource } from "@scytix/urn";

import { type Job } from "../../types";
import { config } from "../../config";

export interface CreateJobParams {
  title: string;
  description: string;
  isActive: boolean;
}

export type UpdateJobParams = CreateJobParams & {
  dateAdded: string;
  dateUpdated: string;
  id: string;
};

const jobUrn = createUrn({ resource: UrnResource.JOB });

export const createJob = async (params: CreateJobParams): Promise<string> => {
  const id = randomUUID();
  const putCommandInput = {
    TableName: config.dynamo.tableName,
    Item: {
      ...params,
      pk: jobUrn,
      sk: createUrn({ resource: UrnResource.JOB, id }),
      dateAdded: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
      id,
    },
  };
  await putDynamoItem(putCommandInput);
  return id;
};

export const getJobs = async (): Promise<ResultSet<Job>> => {
  const queryCommandInput = {
    TableName: config.dynamo.tableName,
    KeyConditionExpression: `pk = :pkValue`,
    ExpressionAttributeValues: {
      ":pkValue": jobUrn,
    },
  };
  return await queryDynamo(queryCommandInput);
};

export const getJob = async (id: string): Promise<Job | undefined> => {
  const getCommandInput = {
    TableName: config.dynamo.tableName,
    Key: {
      pk: jobUrn,
      sk: createUrn({ resource: UrnResource.JOB, id }),
    },
  };

  return await getDynamoItem(getCommandInput);
};

export const deleteJob = async (id: string): Promise<void> => {
  const deleteCommandInput = {
    TableName: config.dynamo.tableName,
    Key: {
      pk: jobUrn,
      sk: createUrn({ resource: UrnResource.JOB, id }),
    },
  };

  return await deleteDynamoItem(deleteCommandInput);
};

export const updateJob = async (params: UpdateJobParams): Promise<void> => {
  const putCommandInput = {
    TableName: config.dynamo.tableName,
    Item: {
      ...params,
      pk: jobUrn,
      sk: createUrn({ resource: UrnResource.JOB, id: params.id }),
      dateUpdated: new Date().toISOString(),
    },
  };

  await putDynamoItem(putCommandInput);
};

import { randomUUID } from "node:crypto";
import {
  putDynamoItem,
  queryDynamo,
  getDynamoItem,
  deleteDynamoItem,
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
  pk: string;
  sk: string;
};

const jobUrn = createUrn({ resource: UrnResource.JOB });

export const createDynamoJob = async (
  params: CreateJobParams
): Promise<string> => {
  const id = randomUUID();
  const putCommandInput = {
    TableName: config.table.name,
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

export const getDynamoJobs = async () => {
  const queryCommandInput = {
    TableName: config.table.name,
    KeyConditionExpression: `pk = :pkValue`,
    ExpressionAttributeValues: {
      ":pkValue": jobUrn
    },
  };
  const items = [];

  try {
    const data = await queryDynamo(queryCommandInput);
    items.push(data.items)
  } catch (error) {
    
  }
  
};

export const getDynamoJob = async (id: string): Promise<Job | undefined> => {
  const getCommandInput = {
    TableName: config.table.name,
    Key: {
      pk: jobUrn,
      sk: createUrn({ resource: UrnResource.JOB, id }),
    },
  };

  return await getDynamoItem(getCommandInput);
};

export const deleteDynamoJob = async (id: string): Promise<void> => {
  const deleteCommandInput = {
    TableName: config.table.name,
    Key: {
      pk: jobUrn,
      sk: createUrn({ resource: UrnResource.JOB, id }),
    },
  };

  return await deleteDynamoItem(deleteCommandInput);
};

export const updateDynamoJob = async (params: UpdateJobParams): Promise<void> => {
  const putCommandInput = {
    TableName: config.table.name,
    Item: {
      ...params,
      pk: jobUrn,
      sk: createUrn({ resource: UrnResource.JOB, id: params.id}),
      dateUpdated: new Date().toISOString(),
    },
  };

  await putDynamoItem(putCommandInput);
};

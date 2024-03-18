import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";
import { getDynamoItem } from "@scytix/dynamo";
import { createUrn, UrnResource, type ScytixUrn } from "@scytix/urn";

import { getJob, type Job, jobUrn } from "..";

jest.mock("../../../config", () => ({
  config: {
    dynamoTableName: "TABLE",
  },
}));

jest.mock("@scytix/urn");
jest.mock("@scytix/dynamo");

describe("Get job function", () => {
  const Job = {} as Job;
  const id = "testId";
  const scytixSkValue = "testSk" as unknown as ScytixUrn;

  beforeEach(() => {
    resetAllWhenMocks();
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
  });

  it("should return the correct response", async () => {
    const getCommandInput = {
      TableName: "TABLE",
      Key: {
        pk: jobUrn,
        sk: scytixSkValue,
      },
    };
    when(createUrn as unknown as jest.Mock)
      .calledWith({ resource: UrnResource.JOB, id })
      .mockReturnValue(scytixSkValue);

    when(getDynamoItem as unknown as jest.Mock)
      .expectCalledWith(getCommandInput)
      .mockResolvedValue(Job);

    await expect(getJob(id)).resolves.toEqual(Job);
  });

  it("should return undefined if no Job is found", async () => {
    const getCommandInput = {
      TableName: "TABLE",
      Key: {
        pk: jobUrn,
        sk: scytixSkValue,
      },
    };
    when(createUrn as unknown as jest.Mock)
      .calledWith({ resource: UrnResource.JOB, id })
      .mockReturnValue(scytixSkValue);

    when(getDynamoItem as unknown as jest.Mock)
      .expectCalledWith(getCommandInput)
      .mockResolvedValue(undefined);

    await expect(getJob(id)).resolves.toEqual(undefined);
  });
});

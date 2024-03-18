import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";
import { randomUUID } from "node:crypto";
import { putDynamoItem } from "@scytix/dynamo";
import { createUrn, UrnResource, type ScytixUrn } from "@scytix/urn";

import { updateJob, jobUrn, type UpdateJobParams } from "..";

jest.mock("../../../config", () => ({
  config: {
    dynamoTableName: "TABLE",
  },
}));

jest.mock("@scytix/urn");
jest.mock("@scytix/dynamo");
jest.mock("node:crypto");

jest
  .spyOn(global.Date.prototype, "toISOString")
  .mockReturnValue("2023-09-06T11:54:47.050Z");

describe("Update job function", () => {
  const params = {} as UpdateJobParams;
  const id = randomUUID();
  const scytixSkValue = "testSk" as unknown as ScytixUrn;

  beforeEach(() => {
    resetAllWhenMocks();
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
  });

  it("should return the correct response", async () => {
    const putCommandInput = {
      TableName: "TABLE",
      Item: {
        ...params,
        pk: jobUrn,
        sk: scytixSkValue,
        dateUpdated: "2023-09-06T11:54:47.050Z",
        id,
      },
    };
    when(createUrn as unknown as jest.Mock)
      .calledWith({ resource: UrnResource.JOB, id })
      .mockReturnValue(scytixSkValue);

    when(putDynamoItem as unknown as jest.Mock)
      .expectCalledWith(putCommandInput)
      .mockResolvedValue(undefined);

    await expect(updateJob(params)).resolves.toEqual(id);
  });
});

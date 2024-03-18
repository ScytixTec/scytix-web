import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";
import { deleteDynamoItem } from "@scytix/dynamo";
import { createUrn, UrnResource, type ScytixUrn } from "@scytix/urn";

import { deleteJob, jobUrn } from "..";

jest.mock("../../../config", () => ({
  config: {
    dynamoTableName: "TABLE",
  },
}));

jest.mock("@scytix/urn");
jest.mock("@scytix/dynamo");

describe("Delete job function", () => {
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

    when(deleteDynamoItem as unknown as jest.Mock)
      .expectCalledWith(getCommandInput)
      .mockResolvedValue(undefined);

    await expect(deleteJob(id)).resolves.toEqual(undefined);
  });
});

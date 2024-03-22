import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";
import { type ResultSet, queryDynamo } from "@scytix/dynamo";

import { getJobs, type Job, jobUrn } from "..";

jest.mock("../../../config", () => ({
  config: {
    dynamoTableName: "TABLE",
  },
}));

jest.mock("@scytix/dynamo");

describe("Get jobs function", () => {
  const Jobs = {
    items: [],
  } as ResultSet<Job>;

  beforeEach(() => {
    resetAllWhenMocks();
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
  });

  it("should return the correct response", async () => {
    const queryCommandInput = {
      TableName: "TABLE",
      KeyConditionExpression: `pk = :pkValue`,
      ExpressionAttributeValues: {
        ":pkValue": jobUrn,
      },
    };

    when(queryDynamo as unknown as jest.Mock)
      .expectCalledWith(queryCommandInput)
      .mockResolvedValue(Jobs);

    await expect(getJobs()).resolves.toEqual(Jobs);
  });
});

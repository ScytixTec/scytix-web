import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";
import { queryDynamo } from "@scytix/dynamo";

import { queryDynamoAllRecords } from "../query-dynamo-all-records";

jest.mock("@scytix/dynamo");

describe("Query Dynamo all records", () => {
  const params = {
    TableName: "TABLE",
    KeyConditionExpression: "pk = :pkValue",
    ExpressionAttributeValues: {
      ":pkValue": "value",
    },
  };

  beforeEach(() => {
    resetAllWhenMocks();
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
  });

  it("Returns empty array if no records", async () => {
    const returnedValue = { items: [] };
    when(queryDynamo).calledWith(params).mockResolvedValue(returnedValue);

    await expect(queryDynamoAllRecords(params)).resolves.toEqual([]);
  });

  it("Returns the items if there are any", async () => {
    const returnedValue = { items: [{ id: "2", name: "test" }] };
    when(queryDynamo).calledWith(params).mockResolvedValue(returnedValue);

    await expect(queryDynamoAllRecords(params)).resolves.toEqual([
      { id: "2", name: "test" },
    ]);
  });

  // it("Queries twice if lastEvaluatedKey is present and returns the items", async () => {
  //   const paramsWithExclusiveStartKey = {
  //     TableName: "TABLE",
  //     KeyConditionExpression: "pk = :pkValue",
  //     ExpressionAttributeValues: {
  //       ":pkValue": "value",
  //     },
  //     ExclusiveStartKey: { id: "1" },
  //   };
  //   const returnedValue = {
  //     items: [{ id: "1" }],
  //     lastEvaluatedKey: { id: "1" },
  //   };
  //   const secondReturnvalue = { items: [{ id: "2" }] };
  //   when(queryDynamo).calledWith(params).mockResolvedValue(returnedValue);

  //   when(queryDynamo)
  //     .calledWith(paramsWithExclusiveStartKey)
  //     .mockResolvedValue(secondReturnvalue);

  //   await expect(queryDynamoAllRecords(params)).resolves.toEqual([
  //     { id: "1" },
  //     { id: "2" },
  //   ]);
  // });
});

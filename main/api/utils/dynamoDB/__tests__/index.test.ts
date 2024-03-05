import {
  DynamoDBDocumentClient,
  GetCommandInput,
  PutCommandInput,
  QueryCommandInput,
  GetCommandOutput,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";
import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";

import { getDynamoItem, putDynamoItem, queryDynamoTable } from "..";

describe("ScytixDynamoDbClient", () => {
  let dynamoClient: DynamoDBDocumentClient;

  beforeEach(() => {
    resetAllWhenMocks();
    jest.resetAllMocks();
    dynamoClient = {
      send: jest.fn(),
    } as unknown as DynamoDBDocumentClient;
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
    jest.clearAllMocks();
  });

  describe("getDynamoItem", () => {
    it("should get item", async () => {
      const params: GetCommandInput = {
        TableName: "TestTable",
        Key: { id: "testId" },
      };
      const mockItem: GetCommandOutput = {
        $metadata: {},
        Item: {
          id: "testId",
        },
      };

      const result = await getDynamoItem(dynamoClient, params);

      expect(result).toEqual(mockItem);
    });
  });
});

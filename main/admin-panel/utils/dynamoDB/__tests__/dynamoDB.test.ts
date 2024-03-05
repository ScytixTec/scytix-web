import { DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";
import {
  GetCommand,
  QueryCommand,
  PutCommand,
  GetCommandInput,
  GetCommandOutput,
} from "@aws-sdk/lib-dynamodb";

import { initializeDynamoDb, ScytixDynamoDbClient } from "..";

const mockedGetCommand = jest.fn((params: GetCommandInput) => ({
  ...params,
}));

const mockedDynamoDBClient = {
  send: jest.fn(),
};

jest.doMock("@aws-sdk/client-dynamodb", () => ({
  DynamoDBClient: jest.fn(() => mockedDynamoDBClient),
}));

const mockedDynamoDBDocumentClient = {
  from: jest.fn(),
};

jest.doMock("@aws-sdk/lib-dynamodb", () => ({
  DynamoDBDocumentClient: mockedDynamoDBDocumentClient,
}));

describe("initializeDynamoDb", () => {
  let dynamoDbClient: ScytixDynamoDbClient;

  beforeEach(() => {
    resetAllWhenMocks();
    jest.resetAllMocks();
    const config = {
      region: "eu-central-1",
    } as unknown as DynamoDBClientConfig;
    dynamoDbClient = initializeDynamoDb(config);
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
    jest.clearAllMocks();
  });

  it("should initialize DynamoDB client successfully", () => {
    expect(dynamoDbClient).toBeDefined();
  });

  it("Should get item from DynamoDB table", async () => {
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
    when(mockedDynamoDBClient.send)
      .calledWith(mockedGetCommand(params))
      .mockResolvedValue(mockItem);

    const result = await dynamoDbClient.getDynamoItem(params);

    expect(result).toEqual(mockItem.Item);
  });
});

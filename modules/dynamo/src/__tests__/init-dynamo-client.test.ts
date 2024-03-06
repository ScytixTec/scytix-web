jest.mock("@aws-sdk/client-dynamodb");
jest.mock("@aws-sdk/lib-dynamodb");

import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { resetAllWhenMocks, verifyAllWhenMocksCalled, when } from "jest-when";

import { initDynamoClient } from "..";

describe("initDynamoClient", () => {
  beforeEach(() => {
    resetAllWhenMocks();
    jest.resetAllMocks();
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
    jest.clearAllMocks();
  });

  it("init a dynamo document client with passed config", () => {
    const config = {} as DynamoDBClientConfig;
    const dynamoMockClient = {} as DynamoDBClient;
    const documentClientInstance = {} as DynamoDBDocumentClient;

    when(DynamoDBClient as jest.Mock)
      .expectCalledWith(config)
      .mockReturnValue(dynamoMockClient);

    when(DynamoDBDocumentClient.from)
      .expectCalledWith(dynamoMockClient)
      .mockReturnValue(documentClientInstance);

    expect(initDynamoClient(config)).toBe(undefined);
  });
});

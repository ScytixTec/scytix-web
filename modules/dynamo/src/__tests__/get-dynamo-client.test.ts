jest.mock("@aws-sdk/client-dynamodb");
jest.mock("@aws-sdk/lib-dynamodb");

import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { resetAllWhenMocks, verifyAllWhenMocksCalled, when } from "jest-when";

import { initDynamoClient, getDynamoClient } from "..";

describe("getDynamoClient", () => {
  beforeEach(() => {
    resetAllWhenMocks();
    jest.resetAllMocks();
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
    jest.clearAllMocks();
  });

  it("throws an error if dynamo client is not initialized", () => {
    expect(() => getDynamoClient()).toThrow(
      "DynamoDB client is not initialized.",
    );
  });

  it("gets dynamo client", () => {
    const config = {} as DynamoDBClientConfig;
    const dynamoMockClient = {} as DynamoDBClient;
    const documentClientInstance = {} as DynamoDBDocumentClient;

    when(DynamoDBClient as jest.Mock)
      .expectCalledWith(config)
      .mockReturnValue(dynamoMockClient);

    when(DynamoDBDocumentClient.from)
      .expectCalledWith(dynamoMockClient)
      .mockReturnValue(documentClientInstance);

    initDynamoClient(config);

    expect(getDynamoClient()).toBe(documentClientInstance);
  });
});

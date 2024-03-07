jest.mock("@aws-sdk/client-dynamodb");
jest.mock("@aws-sdk/lib-dynamodb");

import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  QueryCommand,
  QueryCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { resetAllWhenMocks, verifyAllWhenMocksCalled, when } from "jest-when";

import { initDynamoClient, queryDynamo } from "..";

describe("queryDynamo", () => {
  const params = {} as QueryCommandInput;
  const mockSendCommand = jest.fn();

  beforeEach(() => {
    resetAllWhenMocks();
    jest.resetAllMocks();

    const config = {} as DynamoDBClientConfig;
    const dynamoMockClient = {} as DynamoDBClient;
    const documentClientInstance = {
      send: mockSendCommand,
    } as unknown as DynamoDBDocumentClient;

    when(DynamoDBClient as jest.Mock)
      .expectCalledWith(config)
      .mockReturnValue(dynamoMockClient);

    when(DynamoDBDocumentClient.from)
      .expectCalledWith(dynamoMockClient)
      .mockReturnValue(documentClientInstance);

    when(QueryCommand as unknown as jest.Mock)
      .expectCalledWith(params)
      .mockReturnValue({});

    initDynamoClient(config);
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
    jest.clearAllMocks();
  });

  it("queries Dynamo and returns a result set with empty array of items", async () => {
    when(mockSendCommand).expectCalledWith({}).mockResolvedValue({});

    await expect(queryDynamo(params)).resolves.toEqual({
      items: [],
      lastEvaluatedKey: undefined,
    });
  });

  it("queries Dynamo and returns a result set with array of items", async () => {
    const items = [1, 2, 3];

    when(mockSendCommand).expectCalledWith({}).mockResolvedValue({
      Items: items,
    });

    await expect(queryDynamo(params)).resolves.toEqual({
      items,
      lastEvaluatedKey: undefined,
    });
  });

  it("queries Dynamo and returns a result set with array of items and lastEvaluatedKey", async () => {
    const items = [1, 2, 3];
    const lastEvaluatedKey = "LAST_EVALUATED_KEY";

    when(mockSendCommand).expectCalledWith({}).mockResolvedValue({
      Items: items,
      LastEvaluatedKey: lastEvaluatedKey,
    });

    await expect(queryDynamo(params)).resolves.toEqual({
      items,
      lastEvaluatedKey,
    });
  });
});

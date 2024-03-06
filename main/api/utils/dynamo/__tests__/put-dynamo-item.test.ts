import {
  DynamoDBDocumentClient,
  PutCommand,
  PutCommandInput,
  PutCommandOutput,
} from "@aws-sdk/lib-dynamodb";

import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";

import { putDynamoItem } from "..";

describe("getDynamoItem", () => {
  const sendMock = jest.fn();
  const dynamoClient = {
    send: sendMock,
  } as unknown as DynamoDBDocumentClient;

  beforeEach(() => {
    resetAllWhenMocks();
    jest.resetAllMocks();
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
    jest.clearAllMocks();
  });

  it("should get item", async () => {
    const params: PutCommandInput = {
      TableName: "TestTable",
      Item: { name: "Joe" },
    };

    const mockItem = {
      $metadata: {
        httpStatusCode: 200,
        requestId: "698LOHMFMO7NHPC1TG7MLRVE7VVV4KQNSO5AEMVJF66Q9ASUAAJG",
        attempts: 1,
        totalRetryDelay: 0,
      },
      Attributes: undefined,
      ConsumendCapacity: undefined,
      ItemCollectionMetrics: undefined,
    } as PutCommandOutput;

    when(sendMock)
      .expectCalledWith(expect.any(PutCommand))
      .mockResolvedValue(mockItem);

    await expect(putDynamoItem(dynamoClient, params)).resolves.toEqual(
      undefined,
    );
  });
});

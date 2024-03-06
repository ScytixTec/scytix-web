import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  GetCommandOutput,
} from "@aws-sdk/lib-dynamodb";

import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";

import { getDynamoItem } from "..";

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
    const params: GetCommandInput = {
      TableName: "TestTable",
      Key: { id: "testId" },
    };

    const mockItem = {
      Item: {
        id: "testId",
      },
    } as unknown as GetCommandOutput;

    when(sendMock)
      .expectCalledWith(expect.any(GetCommand))
      .mockResolvedValue(mockItem);

    await expect(getDynamoItem(dynamoClient, params)).resolves.toEqual(
      mockItem.Item,
    );
  });

  it("returns undefined if there is no item", async () => {
    const params: GetCommandInput = {
      TableName: "TestTable",
      Key: { id: "testId" },
    };

    const mockItem = {} as GetCommandOutput;

    when(sendMock)
      .expectCalledWith(expect.any(GetCommand))
      .mockResolvedValue(mockItem);

    await expect(getDynamoItem(dynamoClient, params)).resolves.toEqual(
      undefined,
    );
  });
});

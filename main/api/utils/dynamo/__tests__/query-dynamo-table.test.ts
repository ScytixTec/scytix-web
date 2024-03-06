import {
  DynamoDBDocumentClient,
  QueryCommand,
  QueryCommandInput,
  QueryCommandOutput,
} from "@aws-sdk/lib-dynamodb";

import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";

import { queryDynamoTable } from "..";

describe("queryDynamoTable", () => {
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

  // it("should query a table", async () => {
  //   const params: QueryCommandInput = {
  //     TableName: "TestTable",
  //     ExpressionAttributeValues: {
  //       ":v1": {
  //         S: "No One You Know"
  //       }
  //     },
  //     KeyConditionExpression: "Artist = :v1",
  //   };

  //   const mockItem : QueryCommandOutput= {
  //     Items: [
  //       {
  //         SongTitle: {
  //           S: "Call Me Today"
  //         }
  //       }
  //     ]
  //   } as unknown as QueryCommandOutput;

  //   when(sendMock)
  //     .expectCalledWith(expect.any(QueryCommand))
  //     .mockResolvedValueOnce(mockItem);

  //   await expect(queryDynamoTable(dynamoClient, params)).resolves.toEqual(
  //     mockItem.Items
  //   );
  // });

  it("returns undefined if there is no item", async () => {
    const params: QueryCommandInput = {
      TableName: "TestTable",
      ExpressionAttributeValues: {
        ":v1": {
          S: "No One You Know",
        },
      },
      KeyConditionExpression: "Artist = :v1",
    };

    const mockItem = {} as QueryCommandOutput;

    when(sendMock)
      .expectCalledWith(expect.any(QueryCommand))
      .mockResolvedValue(mockItem);

    await expect(queryDynamoTable(dynamoClient, params)).resolves.toEqual(
      undefined,
    );
  });
});

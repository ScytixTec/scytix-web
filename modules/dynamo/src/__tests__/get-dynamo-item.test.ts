import {
  DynamoDBClient,
  type DynamoDBClientConfig,
} from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  type GetCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { resetAllWhenMocks, verifyAllWhenMocksCalled, when } from "jest-when";
import { initDynamoClient, getDynamoItem } from "..";

jest.mock("@aws-sdk/client-dynamodb");
jest.mock("@aws-sdk/lib-dynamodb");

describe("getDynamoClient", () => {
  const params = {} as GetCommandInput;
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

    when(GetCommand as unknown as jest.Mock)
      .expectCalledWith(params)
      .mockReturnValue({});

    initDynamoClient(config);
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
    jest.clearAllMocks();
  });

  it("gets an item from dynamo", async () => {
    const output = {
      Item: "Item",
    };

    when(mockSendCommand).expectCalledWith({}).mockResolvedValue(output);

    await expect(getDynamoItem(params)).resolves.toEqual(output.Item);
  });

  it("returns undefined if there is no item", async () => {
    when(mockSendCommand).expectCalledWith({}).mockResolvedValue({});

    await expect(getDynamoItem(params)).resolves.toEqual(undefined);
  });
});

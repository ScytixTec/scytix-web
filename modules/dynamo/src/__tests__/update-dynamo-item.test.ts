import {
    DynamoDBClient,
    type DynamoDBClientConfig,
  } from "@aws-sdk/client-dynamodb";
  import {
    UpdateCommand,
    DynamoDBDocumentClient,
    type UpdateCommandInput,
  } from "@aws-sdk/lib-dynamodb";
  import { resetAllWhenMocks, verifyAllWhenMocksCalled, when } from "jest-when";
  
  import { initDynamoClient, updateDynamoItem } from "..";
  
  jest.mock("@aws-sdk/client-dynamodb");
  jest.mock("@aws-sdk/lib-dynamodb");
  
  describe("putDynamoItem", () => {
    const params = {} as UpdateCommandInput;
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
  
      when(UpdateCommand as unknown as jest.Mock)
        .expectCalledWith(params)
        .mockReturnValue({});
  
      initDynamoClient(config);
    });
  
    afterEach(() => {
      verifyAllWhenMocksCalled();
      jest.clearAllMocks();
    });
  
    it("puts an item in Dynamo", async () => {
      when(mockSendCommand).expectCalledWith({}).mockResolvedValue(undefined);
  
      await expect(updateDynamoItem(params)).resolves.toEqual(undefined);
    });
  });
  
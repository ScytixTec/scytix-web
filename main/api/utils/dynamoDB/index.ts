import {
  DynamoDBDocumentClient,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
  GetCommand,
  QueryCommandInput,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

export interface ScytixDynamoDbClient {
  getDynamoItem: <T>(
    dynamoClient: DynamoDBDocumentClient,
    params: GetCommandInput,
  ) => Promise<T | undefined>;
  queryDynamoTable: <T>(
    dynamoClient: DynamoDBDocumentClient,
    params: QueryCommandInput,
  ) => Promise<T[] | undefined>;
  putDynamoItem: (
    dynamoClient: DynamoDBDocumentClient,
    params: PutCommandInput,
  ) => void;
}

export const getDynamoItem: ScytixDynamoDbClient["getDynamoItem"] = async <T>(
  dynamoClient: DynamoDBDocumentClient,
  params: GetCommandInput,
) => {
  const data = await dynamoClient.send(new GetCommand(params));

  if (data.Item) {
    return data.Item as T;
  }
};

export const queryDynamoTable: ScytixDynamoDbClient["queryDynamoTable"] =
  async <T>(
    dynamoClient: DynamoDBDocumentClient,
    params: QueryCommandInput,
  ) => {
    console.log({ params });

    const data = await dynamoClient.send(new QueryCommand(params));

    console.log({ data });
    if (data.Items) {
      return data.Items as T[];
    }
  };

export const putDynamoItem: ScytixDynamoDbClient["putDynamoItem"] = async (
  dynamoClient: DynamoDBDocumentClient,
  params: PutCommandInput,
) => {
  console.log({ params });
  await dynamoClient.send(new PutCommand(params));
};

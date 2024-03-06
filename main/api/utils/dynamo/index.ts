import {
  DynamoDBDocumentClient,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
  GetCommand,
  QueryCommandInput,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

export const getDynamoItem = async <T>(
  dynamoClient: DynamoDBDocumentClient,
  params: GetCommandInput,
): Promise<T | undefined> => {
  const data = await dynamoClient.send(new GetCommand(params));

  if (data.Item) {
    return data.Item as T;
  }
};

export const queryDynamoTable = async <T>(
  dynamoClient: DynamoDBDocumentClient,
  params: QueryCommandInput,
): Promise<T[] | undefined> => {
  console.log({ params });

  const data = await dynamoClient.send(new QueryCommand(params));

  console.log({ data });
  if (data.Items) {
    return data.Items as T[];
  }
};

export const putDynamoItem = async (
  dynamoClient: DynamoDBDocumentClient,
  params: PutCommandInput,
): Promise<void> => {
  console.log({ params });
  await dynamoClient.send(new PutCommand(params));
};

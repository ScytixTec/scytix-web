import {
  DynamoDBDocumentClient,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
  GetCommand,
  QueryCommandInput,
  QueryCommand,
  QueryCommandOutput,
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

  let data: QueryCommandOutput;
  let accumulated: T[] = [];
  let ExclusiveStartKey: Record<string, any> | undefined;

  do {
    data = await dynamoClient.send(new QueryCommand(params));
    ExclusiveStartKey = data.LastEvaluatedKey;
    accumulated = [...accumulated, ...((data.Items as T[]) ?? [])];
  } while (data.Items || data.LastEvaluatedKey);

  if (accumulated.length > 0) {
    return accumulated;
  }
};

export const putDynamoItem = async (
  dynamoClient: DynamoDBDocumentClient,
  params: PutCommandInput,
): Promise<void> => {
  console.log({ params });
  await dynamoClient.send(new PutCommand(params));
};

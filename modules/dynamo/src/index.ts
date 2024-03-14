import {
  DynamoDBClient,
  type DynamoDBClientConfig,
} from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  type GetCommandInput,
  PutCommand,
  type PutCommandInput,
  type QueryCommandInput,
  QueryCommand,
  DeleteCommand,
  type DeleteCommandInput,
  UpdateCommand,
  type UpdateCommandInput,
} from "@aws-sdk/lib-dynamodb";

let ddbDocClient: DynamoDBDocumentClient;

export interface ResultSet<T> {
  items: T[];
  lastEvaluatedKey?: Record<string, any>;
}

export const initDynamoClient = (config: DynamoDBClientConfig): void => {
  ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient(config));
};

export const getDynamoClient = (): DynamoDBDocumentClient => {
  if (!ddbDocClient) {
    throw new Error("DynamoDB client is not initialized.");
  }

  return ddbDocClient;
};

export const getDynamoItem = async <T>(
  params: GetCommandInput
): Promise<T | undefined> => {
  const data = await getDynamoClient().send(new GetCommand(params));

  if (data.Item) {
    return data.Item as T;
  }
};

export const putDynamoItem = async (params: PutCommandInput): Promise<void> => {
  await getDynamoClient().send(new PutCommand(params));
};

export const queryDynamo = async <T>(
  params: QueryCommandInput
): Promise<ResultSet<T>> => {
  const data = await getDynamoClient().send(new QueryCommand(params));

  return {
    items: (data.Items ?? []) as T[],
    lastEvaluatedKey: data.LastEvaluatedKey,
  };
};

export const deleteDynamoItem = async (
  params: DeleteCommandInput
): Promise<void> => {
  await getDynamoClient().send(new DeleteCommand(params));
};

export const updateDynamoItem = async (
  params: UpdateCommandInput
): Promise<void> => {
  await getDynamoClient().send(new UpdateCommand(params));
};

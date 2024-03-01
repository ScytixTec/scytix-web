import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
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
  getDynamoItem: <T>(params: GetCommandInput) => Promise<T | undefined>;
  queryDynamoTable: <T>(params: QueryCommandInput) => Promise<T[] | undefined>;
  putDynamoItem: (params: PutCommandInput) => void;
}

export const initializeDynamoDb = (): ScytixDynamoDbClient => {
  const dynamoClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

  const getDynamoItem: ScytixDynamoDbClient["getDynamoItem"] = async <T>(
    params: GetCommandInput,
  ) => {
    const data = await dynamoClient.send(new GetCommand(params));

    if (data.Item) {
      return data.Item as T;
    }
  };

  const queryDynamoTable: ScytixDynamoDbClient["queryDynamoTable"] = async <T>(
    params: QueryCommandInput,
  ) => {
    console.log({ params });

    const data = await dynamoClient.send(new QueryCommand(params));

    console.log({ data });
    if (data.Items) {
      return data.Items as T[];
    }
  };

  const putDynamoItem: ScytixDynamoDbClient["putDynamoItem"] = async (
    params: PutCommandInput,
  ) => {
    console.log({ params });
    await dynamoClient.send(new PutCommand(params));
  };

  return {
    getDynamoItem,
    queryDynamoTable,
    putDynamoItem,
  };
};

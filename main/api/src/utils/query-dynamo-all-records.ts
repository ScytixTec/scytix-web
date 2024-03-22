import { queryDynamo, type ResultSet } from "@scytix/dynamo";

export interface QueryInputParams<T> {
  TableName: string;
  KeyConditionExpression: string;
  ExpressionAttributeValues: Record<string, string>;
  ExclusiveStartKey?: Record<string, T>;
}

export const queryDynamoAllRecords = async <T>(
  params: QueryInputParams<T>,
): Promise<T[]> => {
  let items = [] as T[];

  const data: ResultSet<T> = await queryDynamo(params);

  if (data.items.length > 0) {
    items = [...items, ...data.items];
  }

  if (data.lastEvaluatedKey) {
    const newParams = {
      ...params,
      ExclusiveStartKey: data.lastEvaluatedKey,
    } as QueryInputParams<T>;
    return await queryDynamoAllRecords(newParams);
  }
  return items;
};

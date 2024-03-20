import simpleRestProvider from "ra-data-simple-rest";
import { type DataProvider, fetchUtils } from "react-admin";
import { type CognitoUserSession } from "amazon-cognito-identity-js";

import { userPool } from "./authProvider";
import { config } from "./config";

interface JsonResponse<T> {
  status: number;
  headers: Headers;
  body: string;
  json: T;
}

const httpClient = <T>(
  url: string,
  options: fetchUtils.Options = {},
): Promise<JsonResponse<T>> => {
  const cognitoUser = userPool.getCurrentUser();

  if (cognitoUser) {
    cognitoUser.getSession((_err: null, session: CognitoUserSession) => {
      if (session) {
        options.user = {
          authenticated: true,
          token: session.getAccessToken().getJwtToken(),
        };
      }
    });
  }

  return fetchUtils.fetchJson(url, options);
};

export const dataProvider: DataProvider = simpleRestProvider(
  config.apiUrl,
  httpClient,
);

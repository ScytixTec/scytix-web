import simpleRestProvider from "ra-data-simple-rest";
import { fetchUtils } from "react-admin";
import { userPool } from "./authProvider";
import { CognitoUserSession } from "amazon-cognito-identity-js";

import { config } from "./config";

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
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

export const dataProvider = simpleRestProvider(config.apiUrl, httpClient);

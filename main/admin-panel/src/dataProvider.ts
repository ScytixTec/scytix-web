import simpleRestProvider from "ra-data-simple-rest";
import { fetchUtils } from "react-admin";
import { userPool } from "./authProvider";
import { CognitoUserSession } from "amazon-cognito-identity-js";

import { config } from "./config";

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  const cognitoUser = userPool.getCurrentUser();

  options.headers = (options.headers ?? new Headers()) as Headers;

  if (cognitoUser) {
    cognitoUser.getSession((err: null, session: CognitoUserSession) => {
      if (session) {
        const token = session.getAccessToken().getJwtToken();
        //   options.headers?.set("Authorization", `${token}`);
      }
    });
  }

  return fetchUtils.fetchJson(url, options);
};

export const dataProvider = simpleRestProvider(config.apiUrl, httpClient);

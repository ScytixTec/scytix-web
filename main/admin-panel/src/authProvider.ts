import { CognitoAuthProvider } from "ra-auth-cognito";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { config } from "./config";

export const userPool = new CognitoUserPool({
  UserPoolId: config.cognito.userPoolId,
  ClientId: config.cognito.appClientId,
});

export const authProvider = CognitoAuthProvider(userPool);

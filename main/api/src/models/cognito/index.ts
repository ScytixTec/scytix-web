import { CognitoJwtVerifier } from "aws-jwt-verify";
import {
  type CognitoVerifyProperties,
  type CognitoJwtVerifierSingleUserPool,
} from "aws-jwt-verify/cognito-verifier";

let jwtVerifier: CognitoJwtVerifierSingleUserPool<
  CognitoVerifyProperties & { userPoolId: string }
>;

export const initCognitoClient = (
  config: CognitoVerifyProperties & { userPoolId: string },
): void => {
  jwtVerifier = CognitoJwtVerifier.create(config);
};

export const getCognitoClient = (): CognitoJwtVerifierSingleUserPool<
  CognitoVerifyProperties & { userPoolId: string }
> => {
  if (!jwtVerifier) {
    throw new Error("Cognito client is not initialized.");
  }
  return jwtVerifier;
};

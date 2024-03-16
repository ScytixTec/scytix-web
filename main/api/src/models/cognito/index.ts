import { CognitoJwtVerifier } from "aws-jwt-verify";

import { config } from "../../config";

let jwtVerifier: ReturnType<typeof CognitoJwtVerifier.create>;

export const initCognitoClient = (): void => {
  jwtVerifier = CognitoJwtVerifier.create({
    ...config.cognito,
    tokenUse: "access",
  });
};

export const getCognitoClient = (): typeof jwtVerifier => {
  if (!jwtVerifier) {
    throw new Error("Cognito client is not initialized.");
  }

  return jwtVerifier;
};

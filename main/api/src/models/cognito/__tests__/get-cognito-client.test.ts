import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import {
  type CognitoJwtVerifierSingleUserPool,
  type CognitoVerifyProperties,
} from "aws-jwt-verify/cognito-verifier";

import { initCognitoClient, getCognitoClient } from "..";

jest.mock(
  "aws-jwt-verify",
  () =>
    ({
      ...jest.requireActual("aws-jwt-verify"),
      CognitoJwtVerifier: {
        create: jest.fn(),
      },
    }) as ReturnType<typeof jest.mock>,
);

describe("test getCognitoClient function", () => {
  beforeEach(() => {
    resetAllWhenMocks();
    jest.resetAllMocks();
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
    jest.clearAllMocks();
  });

  it("throws an error if cognito client is not initialized", () => {
    expect(() => getCognitoClient()).toThrow(
      "Cognito client is not initialized.",
    );
  });

  it("Gets cognito client", () => {
    const config: CognitoVerifyProperties & { userPoolId: string } = {
      userPoolId: "us-east-1_123456",
      tokenUse: "access",
      clientId: "5ra91i9p4trq42m2vnjs0pv06q",
      scope: "read",
    };
    const jwtVerifier = {
      verify: jest.fn(),
    } as unknown as CognitoJwtVerifierSingleUserPool<
      CognitoVerifyProperties & {
        userPoolId: string;
      }
    >;

    when(CognitoJwtVerifier.create as jest.Mock)
      .calledWith(config)
      .mockReturnValue(jwtVerifier);

    initCognitoClient(config);

    expect(getCognitoClient()).toBe(jwtVerifier);
  });
});

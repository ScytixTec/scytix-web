import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import {
  type CognitoJwtVerifierSingleUserPool,
  type CognitoVerifyProperties,
} from "aws-jwt-verify/cognito-verifier";

import { initCognitoClient } from "..";

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

describe("test initCognitoClient function", () => {
  beforeEach(() => {
    resetAllWhenMocks();
    jest.resetAllMocks();
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
    jest.clearAllMocks();
  });

  it("Initializes cognito client", () => {
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

    expect(initCognitoClient(config)).toBe(undefined);
  });
});

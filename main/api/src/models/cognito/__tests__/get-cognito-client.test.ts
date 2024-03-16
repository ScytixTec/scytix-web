import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";
import { CognitoJwtVerifier } from "aws-jwt-verify";

import { config } from "../../../config";
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
jest.mock("../../../config", () => ({
  config: {
    cognito: {
      userPoolId: "USER_POOL_ID",
      clientId: "CLIENT_ID",
      scope: "SCOPE",
    },
  },
}));

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
    const jwtVerifier = {
      verify: jest.fn(),
    };

    when(CognitoJwtVerifier.create as jest.Mock)
      .calledWith({
        ...config.cognito,
        tokenUse: "access",
      })
      .mockReturnValue(jwtVerifier);

    initCognitoClient();

    expect(getCognitoClient()).toBe(jwtVerifier);
  });
});

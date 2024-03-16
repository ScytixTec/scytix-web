import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";
import { CognitoJwtVerifier } from "aws-jwt-verify";

import { initCognitoClient } from "..";
import { config } from "../../../config";

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
    const jwtVerifier = {
      verify: jest.fn(),
    };

    when(CognitoJwtVerifier.create as jest.Mock)
      .calledWith({
        ...config.cognito,
        tokenUse: "access",
      })
      .mockReturnValue(jwtVerifier);

    expect(initCognitoClient()).toBe(undefined);
  });
});

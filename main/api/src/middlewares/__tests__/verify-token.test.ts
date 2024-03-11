import { type NextFunction, type Request, type Response } from "express";
import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";
import { type CognitoJwtPayload } from "aws-jwt-verify/jwt-model";
import { StatusCodes } from "http-status-codes";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import {
  type CognitoJwtVerifierSingleUserPool,
  type CognitoVerifyProperties,
} from "aws-jwt-verify/cognito-verifier";

import { verifyToken } from "../verify-token";
import { initCognitoClient } from "../../models/cognito";

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

describe("Verify token function", () => {
  const mockedStatus = jest.fn();

  const res = {
    status: mockedStatus,
  } as unknown as Response;

  const next = jest.fn() as unknown as NextFunction;

  const mockedVerify = jest.fn();

  beforeEach(() => {
    resetAllWhenMocks();
    jest.resetAllMocks();

    const config: CognitoVerifyProperties & { userPoolId: string } = {
      userPoolId: "us-east-1_123456",
      tokenUse: "access",
      clientId: "5ra91i9p4trq42m2vnjs0pv06q",
      scope: "read",
    };

    const jwtVerifier = {
      verify: mockedVerify,
    } as unknown as CognitoJwtVerifierSingleUserPool<
      CognitoVerifyProperties & {
        userPoolId: string;
      }
    >;

    when(CognitoJwtVerifier.create as jest.Mock)
      .calledWith(config)
      .mockReturnValue(jwtVerifier);

    initCognitoClient(config);
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
    jest.clearAllMocks();
  });

  it("returns Unauthorized for missing req headers authorization", async () => {
    const req = {
      headers: {},
    } as unknown as Request;
    when(mockedStatus)
      .calledWith(StatusCodes.UNAUTHORIZED)
      .mockReturnValue(res);
    expect(await verifyToken(req, res, next)).toEqual(undefined);
  });

  it("returns Unauthorized for wrong wrong headers authorization", async () => {
    const req = {
      headers: {
        authorization: "invalidJWT",
      },
    } as unknown as Request;

    when(mockedVerify)
      .expectCalledWith(req.headers.authorization)
      .mockRejectedValue(new Error());
    when(mockedStatus)
      .calledWith(StatusCodes.UNAUTHORIZED)
      .mockReturnValue(res);

    expect(await verifyToken(req, res, next)).toEqual(undefined);
  });

  it("verifies the token successfully", async () => {
    const req = {
      headers: {
        authorization: "validJWT",
      },
    } as unknown as Request;

    const token = {} as unknown as CognitoJwtPayload;

    when(mockedVerify)
      .calledWith(req.headers.authorization)
      .mockResolvedValue(token);
    when(next as jest.Mock)
      .calledWith()
      .mockReturnValue(undefined);

    expect(await verifyToken(req, res, next)).toEqual(undefined);
  });
});

import { type NextFunction, type Request, type Response } from "express";
import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";
import { StatusCodes } from "http-status-codes";
import { getLogger } from "@scytix/logger";

import { verifyToken } from "../verify-token";
import { getCognitoClient } from "../../models/cognito";

jest.mock("@scytix/logger");
jest.mock("../../models/cognito");

describe("Verify token function", () => {
  const mockStatus = jest.fn();
  const mockSend = jest.fn();

  const mockLoggerError = jest.fn();

  const mockVerify = jest.fn();

  const res = {
    status: mockStatus,
    send: mockSend,
  } as unknown as Response;

  const next = jest.fn() as unknown as NextFunction;

  beforeEach(() => {
    resetAllWhenMocks();
    jest.resetAllMocks();

    when(getLogger)
      .calledWith()
      .mockReturnValue({
        error: mockLoggerError,
      } as unknown as ReturnType<typeof getLogger>);

    when(getCognitoClient)
      .calledWith()
      .mockReturnValue({
        verify: mockVerify,
      } as unknown as ReturnType<typeof getCognitoClient>);
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
    jest.clearAllMocks();
  });

  it("returns Unauthorized for missing req headers authorization", async () => {
    const req = {
      headers: {},
    } as unknown as Request;

    when(mockLoggerError)
      .calledWith({
        message: "Authorization header is required.",
      })
      .mockReturnValue(undefined);

    when(mockStatus).calledWith(StatusCodes.UNAUTHORIZED).mockReturnValue(res);

    when(mockSend).calledWith().mockReturnValue(undefined);

    expect(await verifyToken(req, res, next)).toEqual(undefined);
  });

  it("returns Unauthorized for wrong wrong headers authorization", async () => {
    const req = {
      headers: {
        authorization: "invalidJWT",
      },
    } as unknown as Request;
    const error = "ERROR";

    when(mockVerify)
      .expectCalledWith(req.headers.authorization)
      .mockRejectedValue(error);

    when(mockLoggerError)
      .calledWith({
        message: "Cognito error authentication.",
        error,
      })
      .mockReturnValue(undefined);

    when(mockStatus).calledWith(StatusCodes.UNAUTHORIZED).mockReturnValue(res);

    when(mockSend).calledWith().mockReturnValue(undefined);

    expect(await verifyToken(req, res, next)).toEqual(undefined);
  });

  it("verifies the token successfully", async () => {
    const req = {
      headers: {
        authorization: "validJWT",
      },
    } as unknown as Request;

    when(mockVerify)
      .calledWith(req.headers.authorization)
      .mockResolvedValue({});

    when(next as jest.Mock)
      .calledWith()
      .mockReturnValue(undefined);

    expect(await verifyToken(req, res, next)).toEqual(undefined);
  });
});

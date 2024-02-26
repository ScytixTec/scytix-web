import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";

import { getStatus } from "..";

describe("get status", () => {
  jest.mock("../../../config", () => ({
    config: {
      version: "VERSION",
    },
  }));
  const req = {} as unknown as Request;
  const res = {
    locals: {
      version: "VERSION",
    },
    send: jest.fn(),
    status: jest.fn(),
  } as unknown as Response;

  const responseValue = { status: "OK" };

  beforeEach(() => {
    resetAllWhenMocks();
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
  });

  it("should return the correct response", () => {
    when(res.status).calledWith(StatusCodes.OK).mockReturnValue(res);

    when(res.send).calledWith(responseValue).mockReturnValue(res);

    expect(getStatus(req, res)).toEqual(undefined);
  });
});

import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";

import { getStatus } from "..";

jest.mock("../../../config", () => ({
  config: {
    version: "VERSION",
  },
}));

const mockedSend = jest.fn();
const mockedStatus = jest.fn();

describe("get status", () => {
  const req = {} as unknown as Request;
  const res = {
    send: mockedSend,
    status: mockedStatus,
  } as unknown as Response;

  const responseValue = { status: "OK", version: "VERSION" };

  beforeEach(() => {
    resetAllWhenMocks();
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
  });

  it("should return the correct response", () => {
    when(mockedStatus).calledWith(StatusCodes.OK).mockReturnValue(res);

    when(mockedSend).calledWith(responseValue).mockReturnValue(res);

    expect(getStatus(req, res)).toEqual(undefined);
  });
});

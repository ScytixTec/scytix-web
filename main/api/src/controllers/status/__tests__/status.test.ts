import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";

import { getStatus, getStatusById } from "..";

describe("get status", () => {
  const req = { params: { id: "test" } } as unknown as Request;
  const res = {
    send: jest.fn(),
    status: jest.fn(),
    sendStatus: jest.fn(),
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

  describe("get status with id", () => {
    it("Should return an error for invalid paths", () => {
      when(res.sendStatus)
        .calledWith(StatusCodes.NOT_FOUND)
        .mockReturnValue(res);

      expect(getStatusById(req, res)).toEqual(
        res.sendStatus(StatusCodes.NOT_FOUND),
      );
    });

    it("Should return the right Id when called with number", () => {
      const req = { params: { id: 1 } } as unknown as Request;
      const responseValue = { statusId: 1 };

      when(res.status).calledWith(StatusCodes.OK).mockReturnValue(res);

      when(res.send).calledWith(responseValue).mockReturnValue(res);
      expect(getStatusById(req, res)).toEqual(undefined);
    });
  });
});

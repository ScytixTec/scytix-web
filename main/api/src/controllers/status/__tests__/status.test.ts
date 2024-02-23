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

  // describe("get status with id", () => {
  //   it("Should return an error for invalid paths", () => {
  //     getStatusById(req, res);
  //     expect(res.sendStatus).toHaveBeenCalledWith(404);
  //   });

  //   it("Should return the right Id when called with number", () => {
  //     const req = { params: { id: 1 } } as unknown as Request;
  //     getStatusById(req, res);
  //     expect(res.send).toHaveBeenCalledTimes(1);
  //     expect(res.send).toHaveBeenCalledWith({
  //       statusId: 1,
  //     });
  //     expect(res.status).toHaveBeenCalledWith(200);
  //     expect(getStatusById(req, res)).toEqual(undefined);
  //   });
  // });
});

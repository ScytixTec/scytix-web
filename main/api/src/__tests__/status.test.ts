import { Request, Response } from "express";

import { getStatus, getStatusById } from "../controllers/status";

const req = {} as unknown as Request;
const res = {
  send: jest.fn(),
  status: jest.fn(() => res),
  sendStatus: jest.fn(),
} as unknown as Response;

describe("get status", () => {
  it("should return the correct response", () => {
    getStatus(req, res);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({
      status: "OK",
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe("get status with id", () => {
  it("Should return an error for invalid paths", () => {
    const req = { params: { id: "test" } } as unknown as Request;
    getStatusById(req, res);
    expect(res.sendStatus).toHaveBeenCalledWith(404);
  });

  it("Should return the right Id when called with number", () => {
    const req = { params: { id: 1 } } as unknown as Request;
    getStatusById(req, res);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({
      statusId: 1,
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

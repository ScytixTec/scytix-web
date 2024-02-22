import { Request, Response } from "express";

import { getStatus } from "../controllers/status";

describe("get status", () => {
  it("should return the correct response", () => {
    const req = {} as Request;
    const res = { send: jest.fn() } as unknown as Response;
    getStatus(req, res);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({
      status: "OK",
    });
  });
});

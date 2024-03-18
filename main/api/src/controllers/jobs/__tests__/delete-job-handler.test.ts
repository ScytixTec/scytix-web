import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";

import { deleteJob, type Job } from "../../../models/jobs";
import { deleteJobHandler } from "..";

jest.mock("../../../models/jobs");

const mockedSend = jest.fn();
const mockedStatus = jest.fn();
const mockedJson = jest.fn();

describe("Delete job handler function", () => {
  const Job = {} as Job;
  const req = {
    params: {
      jobId: "test",
    },
  } as unknown as Request;
  const res = {
    send: mockedSend,
    status: mockedStatus,
    json: mockedJson,
  } as unknown as Response;

  const responseValue = { ...Job };

  beforeEach(() => {
    resetAllWhenMocks();
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
  });

  it("should return the correct response", async () => {
    when(deleteJob as unknown as jest.Mock)
      .calledWith(req.params.jobId)
      .mockResolvedValue(Job);
    when(mockedStatus).calledWith(StatusCodes.OK).mockReturnValue(res);

    when(mockedJson).calledWith(responseValue).mockReturnValue(undefined);

    await expect(deleteJobHandler(req, res)).resolves.toEqual(undefined);
  });
});

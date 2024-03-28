import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";

import { getJobs, type Job } from "../../../models/jobs";
import { getJobsHandler } from "..";

jest.mock("../../../models/jobs");

const mockedSend = jest.fn();
const mockedStatus = jest.fn();
const mockedJson = jest.fn();
const mockedSetHeader = jest.fn();

describe("Get jobs handler function", () => {
  const Jobs: Job[] = [];
  const req = {
    params: {
      jobId: "test",
    },
  } as unknown as Request;
  const res = {
    send: mockedSend,
    status: mockedStatus,
    json: mockedJson,
    setHeader: mockedSetHeader,
  } as unknown as Response;

  beforeEach(() => {
    resetAllWhenMocks();
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
  });

  it("should return the correct response", async () => {
    when(getJobs as unknown as jest.Mock)
      .calledWith()
      .mockResolvedValue(Jobs);
    when(mockedSetHeader)
      .calledWith("X-Total-Count", `${Jobs.length}`)
      .mockReturnValue(res);
    when(mockedSetHeader)
      .calledWith("Access-Control-Expose-Headers", "X-Total-Count")
      .mockReturnValue(res);
    when(mockedStatus).calledWith(StatusCodes.OK).mockReturnValue(res);

    when(mockedJson).calledWith(Jobs).mockReturnValue(undefined);

    await expect(getJobsHandler(req, res)).resolves.toEqual(undefined);
  });
});

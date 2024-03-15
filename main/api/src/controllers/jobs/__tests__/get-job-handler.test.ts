import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";

import { getJob } from "../../../models/jobs";
import { getJobHandler } from "..";
import { type JobRequestParams, type Job } from "../../../types";

jest.mock("../../../models/jobs");

const mockedSend = jest.fn();
const mockedStatus = jest.fn();
const mockedJson = jest.fn();

describe("Get job handler function", () => {
  const Job = {} as Job;
  const req = {
    params: {
      jobId: "test",
    },
  } as unknown as Request<JobRequestParams>;
  const res = {
    send: mockedSend,
    status: mockedStatus,
    json: mockedJson,
  } as unknown as Response;

  const responseValue = { ...Job, id: req.params.jobId };

  beforeEach(() => {
    resetAllWhenMocks();
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
  });

  it("should return the correct response", async () => {
    when(getJob as unknown as jest.Mock)
      .calledWith(req.params.jobId)
      .mockResolvedValue(Job);
    when(mockedStatus).calledWith(StatusCodes.OK).mockReturnValue(res);

    when(mockedJson).calledWith(responseValue).mockReturnValue(undefined);

    await expect(getJobHandler(req, res)).resolves.toEqual(undefined);
  });
});

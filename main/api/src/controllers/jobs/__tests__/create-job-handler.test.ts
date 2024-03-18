import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";
import { type ZodError } from "zod";

import { createJob, type CreateJobParams } from "../../../models/jobs";
import { createJobHandler } from "..";
import { JobsSchema } from "../job-zod-schema";

jest.mock("../../../models/jobs");
jest.mock("../job-zod-schema");

const mockedSend = jest.fn();
const mockedStatus = jest.fn();
const mockedJson = jest.fn();
JSON.parse = jest.fn();
const mockedSafeParse = jest.fn();

describe("Get job handler function", () => {
  const req = {
    body: "stringified body",
  } as unknown as Request;
  const res = {
    send: mockedSend,
    status: mockedStatus,
    json: mockedJson,
  } as unknown as Response;

  JobsSchema.safeParse = mockedSafeParse;
  const data = {} as CreateJobParams;
  const id = "test";

  const responseValue = { id: "test" };

  beforeEach(() => {
    resetAllWhenMocks();
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
  });

  it("should return the correct response", async () => {
    const jobsParams = {
      success: true,
    };
    when(JSON.parse as unknown as jest.Mock)
      .calledWith(req.body)
      .mockReturnValue(data);

    when(mockedSafeParse).calledWith(data).mockReturnValue(jobsParams);

    when(mockedStatus).calledWith(StatusCodes.OK).mockReturnValue(res);

    when(mockedJson).calledWith(responseValue).mockReturnValue(undefined);

    when(createJob as unknown as jest.Mock)
      .calledWith(data)
      .mockResolvedValue(id);

    await expect(createJobHandler(req, res)).resolves.toEqual(undefined);
  });

  it("should throw error when the zod parsing fails", async () => {
    const jobsParams = {
      success: false,
      error: {
        format: jest.fn(),
      } as unknown as ZodError,
    };

    when(JSON.parse as unknown as jest.Mock)
      .calledWith(req.body)
      .mockReturnValue(data);

    when(mockedSafeParse).calledWith(data).mockReturnValue(jobsParams);

    when(mockedStatus).calledWith(StatusCodes.BAD_REQUEST).mockReturnValue(res);

    when(mockedSend)
      .calledWith({ errors: jobsParams.error.format() })
      .mockReturnValue(res);

    await expect(createJobHandler(req, res)).resolves.toEqual(undefined);
  });
});

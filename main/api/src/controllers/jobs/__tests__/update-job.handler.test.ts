import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";
import { type ZodError } from "zod";

import { updateJob, type UpdateJobParams } from "../../../models/jobs";
import { updateJobHandler } from "..";
import { JobsUpdateSchema } from "../job-zod-schema";

jest.mock("../../../models/jobs");
jest.mock("../job-zod-schema");

const mockedSend = jest.fn();
const mockedStatus = jest.fn();
const mockedJson = jest.fn();
JSON.parse = jest.fn();
const mockedSafeParse = jest.fn();

describe("Update job handler function", () => {
  const req = {
    body: "stringified body",
  } as unknown as Request;
  const res = {
    send: mockedSend,
    status: mockedStatus,
    json: mockedJson,
  } as unknown as Response;

  const data = {} as UpdateJobParams;
  JobsUpdateSchema.safeParse = mockedSafeParse;

  const responseValue = { ...data };

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

    when(updateJob as unknown as jest.Mock)
      .calledWith(data)
      .mockResolvedValue(data);

    await expect(updateJobHandler(req, res)).resolves.toEqual(undefined);
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

    await expect(updateJobHandler(req, res)).resolves.toEqual(undefined);
  });
});

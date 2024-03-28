import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";
import { type ZodError } from "zod";

import { updateJob, type UpdateJobParams } from "../../../models/jobs";
import { updateJobHandler } from "..";
import { JobsUpdateSchema } from "../job-zod-schema";
import { mapValidationErrors } from "../../../utils";
import { ScytixError } from "../../../errors";
import { type FieldErrors } from "../../../utils";

jest.mock("../../../models/jobs");
jest.mock("../job-zod-schema");
jest.mock("../../../utils");

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
    const fieldErrors = {
      message: ScytixError.VALIDATION_ERROR,
      errors: {
        title: "wrong",
      },
    } as unknown as FieldErrors;

    const jobsParams = {
      success: false,
      error: {
        flatten: jest.fn(() => fieldErrors),
      } as unknown as ZodError,
    };

    when(JSON.parse as unknown as jest.Mock)
      .calledWith(req.body)
      .mockReturnValue(data);

    when(mockedSafeParse).calledWith(data).mockReturnValue(jobsParams);

    when(mockedStatus).calledWith(StatusCodes.BAD_REQUEST).mockReturnValue(res);

    when(mapValidationErrors as jest.Mock)
      .calledWith(
        ScytixError.VALIDATION_ERROR,
        jobsParams.error.flatten().fieldErrors,
      )
      .mockResolvedValue(fieldErrors);

    await expect(updateJobHandler(req, res)).resolves.toEqual(undefined);
  });
});

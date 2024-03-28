import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";

import { getJobs, type Job } from "..";
import { db } from "../../../db/config";
import { getJobsQuery } from "../../../queries/jobs";

jest.mock("../../../db/config", () => ({
  db: {
    any: jest.fn(),
  },
}));

describe("Get jobs function", () => {
  const Jobs: Job[] = [];

  const mockedDbAny = jest.fn();

  db.any = mockedDbAny;

  beforeEach(() => {
    resetAllWhenMocks();
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
  });

  it("should return the correct response", async () => {
    when(mockedDbAny).expectCalledWith(getJobsQuery).mockResolvedValue(Jobs);

    await expect(getJobs()).resolves.toEqual(Jobs);
  });
});

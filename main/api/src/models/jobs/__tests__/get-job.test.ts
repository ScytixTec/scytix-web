import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";

import { getJob, type Job } from "..";
import { getJobQuery } from "../../../queries/jobs";
import { db } from "../../../db/config";

jest.mock("../../../db/config", () => ({
  db: {
    one: jest.fn(),
  },
}));

describe("Get job function", () => {
  const Job = {} as Job;
  const id = "testId";

  const mockedDbOne = jest.fn();

  db.one = mockedDbOne;

  beforeEach(() => {
    resetAllWhenMocks();
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
  });

  it("should return the correct response", async () => {
    when(mockedDbOne)
      .expectCalledWith(getJobQuery, [id])
      .mockResolvedValue(Job);

    await expect(getJob(id)).resolves.toEqual(Job);
  });

  it("should return undefined if no Job is found", async () => {
    when(mockedDbOne)
      .expectCalledWith(getJobQuery, [id])
      .mockResolvedValue(undefined);

    await expect(getJob(id)).resolves.toEqual(undefined);
  });
});

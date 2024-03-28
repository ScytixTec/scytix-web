import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";

import { createJob, type CreateJobParams } from "..";
import { db } from "../../../db/config";
import { createJobQuery } from "../../../queries/jobs";

jest.mock("../../../db/config", () => ({
  db: {
    one: jest.fn(),
  },
}));

jest
  .spyOn(global.Date.prototype, "toISOString")
  .mockReturnValue("2023-09-06T11:54:47.050Z");

describe("Create job function", () => {
  const params = {} as CreateJobParams;
  const id = 1;

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
      .expectCalledWith(createJobQuery, {
        ...params,
        dateAdded: "2023-09-06T11:54:47.050Z",
        dateUpdated: "2023-09-06T11:54:47.050Z",
      })
      .mockResolvedValue(id);

    await expect(createJob(params)).resolves.toEqual(id);
  });
});

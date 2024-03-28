import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";

import { deleteJob } from "..";
import { db } from "../../../db/config";
import { deleteJobQuery } from "../../../queries/jobs";

jest.mock("../../../db/config", () => ({
  db: {
    none: jest.fn(),
  },
}));

describe("Delete job function", () => {
  const id = "testId";

  const mockedDbNone = jest.fn();

  db.none = mockedDbNone;

  beforeEach(() => {
    resetAllWhenMocks();
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
  });

  it("should return the correct response", async () => {
    when(mockedDbNone)
      .expectCalledWith(deleteJobQuery, [id])
      .mockResolvedValue(undefined);
    await expect(deleteJob(id)).resolves.toEqual(undefined);
  });
});

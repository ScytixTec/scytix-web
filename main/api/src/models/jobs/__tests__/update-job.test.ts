import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";

import { updateJob, type UpdateJobParams } from "..";
import { db } from "../../../db/config";
import { updateJobQuery } from "../../../queries/jobs";

jest.mock("../../../db/config", () => ({
  db: {
    none: jest.fn(),
  },
}));

jest
  .spyOn(global.Date.prototype, "toISOString")
  .mockReturnValue("2023-09-06T11:54:47.050Z");

describe("Update job function", () => {
  const params = {} as UpdateJobParams;

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
      .expectCalledWith(updateJobQuery, {
        ...params,
        dateUpdated: "2023-09-06T11:54:47.050Z",
      })
      .mockResolvedValue(undefined);

    await expect(updateJob(params)).resolves.toEqual(undefined);
  });
});

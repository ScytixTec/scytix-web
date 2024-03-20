import { mapValidationErrors } from "..";
import { ScytixError } from "../../errors";
import { type FieldErrors } from "..";

describe("Map validation errors function", () => {
  it("should map validation errors correctly", () => {
    const message: ScytixError = ScytixError.VALIDATION_ERROR;

    const errors: Record<string, string[]> = {
      title: ["Title is too short", "another error"],
      description: ["Description is too short"],
    };

    const expectedResult: FieldErrors = {
      message,
      errors: {
        title: "Title is too short another error",
        description: "Description is too short",
      },
    };

    expect(mapValidationErrors(message, errors)).toEqual(expectedResult);
  });
});

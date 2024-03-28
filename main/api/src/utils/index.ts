import { type ScytixError } from "../errors";

export interface FieldErrors {
  message: ScytixError;
  errors: Record<string, string>;
}

export const mapValidationErrors = (
  message: ScytixError,
  errors: Record<string, string[]>,
): FieldErrors => ({
  message,
  errors: Object.fromEntries(
    Object.entries(errors).map(([key, value]) => [key, value.join(" ")]),
  ),
});

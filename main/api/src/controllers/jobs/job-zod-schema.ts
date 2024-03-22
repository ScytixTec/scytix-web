import { z } from "zod";

export const JobsSchema = z.object({
  description: z.string(),
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" }),
  isActive: z.boolean(),
});

export const JobsUpdateSchema = JobsSchema.extend({
  id: z.string(),
  dateAdded: z.string(),
  dateUpdated: z.string(),
});

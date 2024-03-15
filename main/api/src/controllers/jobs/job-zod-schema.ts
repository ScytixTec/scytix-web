import { z } from "zod";

export const JobsSchema = z.object({
  description: z
    .string()
    .min(15, { message: "Description must be at least 15 characters long" }),
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

import { z } from "zod";

export const JobsSchema = z.object({
  description: z.string().min(15),
  title: z.string().min(5),
  isActive: z.boolean(),
});

export const JobsUpdateSchema = JobsSchema.extend({
  id: z.string(),
  dateAdded: z.string(),
  dateUpdated: z.string()
})
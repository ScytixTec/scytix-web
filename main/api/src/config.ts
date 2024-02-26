import { z } from "zod";

const ConfigSchema = z.object({
  version: z.string(),
});

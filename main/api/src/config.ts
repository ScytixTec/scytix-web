import { z } from "zod";
import yaml from "yaml";
import fs from "node:fs";

import * as packageJson from "../package.json";

const ConfigSchema = z.object({
  version: z.string(),
  logger: z
    .object({
      type: z.literal("local"),
      level: z.string(),
    })
    .or(
      z.object({
        type: z.literal("aws"),
        level: z.string(),
        region: z.string(),
        serviceName: z.string(),
        stage: z.string(),
        version: z.string(),
      }),
    ),
  cognito: z.object({
    userPoolId: z.string(),
    clientId: z.string(),
    scope: z.array(z.string()),
  }),
  cors: z.object({
    allowedOrigins: z.string().array(),
  }),
});

export const config = ConfigSchema.parse({
  ...yaml.parse(fs.readFileSync("./config.yml", "utf8")),
  version: packageJson.version,
});

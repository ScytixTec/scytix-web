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
  dynamo: z.object({
    region: z.string().optional(),
    endpoint: z.string().optional(),
  }),
  dynamoTableName: z.string(),
});

export const config = ConfigSchema.parse({
  ...yaml.parse(fs.readFileSync("./config.yml", "utf8")),
  version: packageJson.version,
});

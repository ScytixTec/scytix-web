import { z } from "zod";
import yaml from "yaml";
import fs from "fs";
import * as packageJson from "../package.json";

const ConfigSchema = z.object({
  version: z.string(),
});

export const config = ConfigSchema.parse({
  ...yaml.parse(fs.readFileSync("./config.yml", "utf8")),
  version: packageJson.version,
});


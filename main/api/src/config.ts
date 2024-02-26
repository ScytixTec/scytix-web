import { z } from "zod";
import yaml from "yaml";
import fs from "fs";
import * as packageJson from "../package.json";

const configYaml = fs.readFileSync("./config.yml", "utf8");

const ConfigSchema = z.object({
  version: z.string(),
});

type Config = z.infer<typeof ConfigSchema>;
const version = packageJson.version;

const parsedConfig = ConfigSchema.parse(yaml.parse(configYaml));
parsedConfig.version = version;

export const config: Config = parsedConfig;

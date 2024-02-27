import { z } from "zod";

import * as packageJson from "../package.json";
import YamlConfig from "../config.yml";

const ConfigSchema = z.object({
  version: z.string(),
  cognito: z.object({
    userPoolId: z.string(),
    appClientId: z.string(),
  }),
  apiUrl: z.string().url(),
});

export const config = ConfigSchema.parse({
  ...YamlConfig,
  version: packageJson.version,
});

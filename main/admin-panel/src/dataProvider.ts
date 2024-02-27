import simpleRestProvider from "ra-data-simple-rest";

import { config } from "./config";

export const dataProvider = simpleRestProvider(config.cognito.apiUrl);

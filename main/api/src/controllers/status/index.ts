import { StatusCodes } from "http-status-codes";

import { type BasicControllerType } from "../../types";
import { config } from "../../config";

export const getStatus: BasicControllerType = (req, res) => {
  res.status(StatusCodes.OK).send({ status: "OK", version: config.version });
};

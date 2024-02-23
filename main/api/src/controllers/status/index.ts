import { StatusCodes } from "http-status-codes";

import { BasicControllerType } from "../../types";

export const getStatus: BasicControllerType = (req, res) => {
  res.status(StatusCodes.OK).send({
    status: "OK",
  });
};

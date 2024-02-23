import { StatusCodes } from "http-status-codes";

import { BasicControllerType } from "../../types";

export const getStatus: BasicControllerType = (req, res) => {
  res.status(StatusCodes.OK).send({
    status: "OK",
  });
};

export const getStatusById: BasicControllerType = (req, res) => {
  if (isNaN(+req.params.id)) return res.sendStatus(StatusCodes.NOT_FOUND);

  res.status(StatusCodes.OK).send({
    statusId: req.params.id,
  });
};

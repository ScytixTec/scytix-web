import { BasicControllerType } from "../../types";

export const getStatus: BasicControllerType = (req, res) => {
  res.status(200).send({
    status: "OK",
  });
};

export const getStatusById: BasicControllerType = (req, res) => {
  if (isNaN(+req.params.id)) return res.sendStatus(404);

  res.status(200).send({
    statusId: req.params.id,
  });
};

import { BasicControllerType } from "../../types";

export const getStatus: BasicControllerType = (req, res) => {
  res.send({
    status: "OK",
  });
};

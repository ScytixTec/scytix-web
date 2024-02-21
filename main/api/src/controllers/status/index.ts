import { Request, Response } from 'express';

export function getStatus(req : Request, res: Response) {
    res.send({
        status: "OK"
      });
}

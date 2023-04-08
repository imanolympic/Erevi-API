import express, { Request, Response } from "express";
import shippingController from "../controllers/shipping.controller";

const router = express.Router();

router.route("/rate").post((req: Request, res: Response) => {
  shippingController
    .getShippingRates(req)
    .then((response) => res.json(response));
});

export default router;

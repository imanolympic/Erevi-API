import express, { Request, Response } from "express";
import productsController from "../controllers/products.controller";

const router = express.Router();

router
  .route("")
  .post((req: Request, res: Response) =>
    productsController.postProduct(req).then((response) => res.json(response))
  );

router
  .route("")
  .get((req: Request, res: Response) =>
    productsController.getProducts().then((response) => res.json(response))
  );

router
  .route("/:id")
  .get((req: Request, res: Response) =>
    productsController
      .getProductById(req)
      .then((response) => res.json(response))
  );

export default router;

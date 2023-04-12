import express, { Request, Response } from "express";
import productsController from "../controllers/products.controller";

const router = express.Router();

router
  .route("")
  .post((req: Request, res: Response) =>
    productsController
      .postProduct(req)
      .then((response) => res.status(response.status).json(response.body))
  );

router
  .route("/:id")
  .put((req: Request, res: Response) =>
    productsController
      .putProduct(req)
      .then((response) => res.status(response.status).json(response.body))
  );

router
  .route("/")
  .get((req: Request, res: Response) =>
    productsController
      .getProducts()
      .then((response) => res.status(response.status).json(response.body))
  );

router
  .route("/:id")
  .get((req: Request, res: Response) =>
    productsController
      .getProductById(req)
      .then((response) => res.status(response.status).json(response.body))
  );

router
  .route("/:id")
  .delete((req: Request, res: Response) =>
    productsController
      .deleteProduct(req)
      .then((response) => res.status(response.status).json(response.body))
  );

export default router;

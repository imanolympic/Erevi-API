import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsRouter from "./routers/products.router";
import shippingRouter from "./routers/shipping.router";
import checkoutRouter from "./routers/checkout.router";

import notFound from "./controllers/not-found";

dotenv.config();

const app = express();

// setup middleware
app.use(express.json());
app.use(cors());

// configure routes
app.get("/", (req, res, next) => {
  res.send("API works!");
});
app.use("/api/products", productsRouter);
app.use("/api/shipping", shippingRouter);
app.use("/api/checkout", checkoutRouter);
app.use("*", (_: Request, res: Response) => res.json(notFound()));

const port = process.env.PORT || 5051;
app.listen(port, () => {
  console.log("listening on port:", port);
});

export default app;

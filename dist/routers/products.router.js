"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_controller_1 = __importDefault(require("../controllers/products.controller"));
const router = express_1.default.Router();
router
    .route("")
    .post((req, res) => products_controller_1.default.postProduct(req).then((response) => res.json(response)));
router
    .route("/:id")
    .put((req, res) => products_controller_1.default.putProduct(req).then((response) => res.json(response)));
router
    .route("/")
    .get((req, res) => products_controller_1.default.getProducts().then((response) => res.json(response)));
router
    .route("/:id")
    .get((req, res) => products_controller_1.default
    .getProductById(req)
    .then((response) => res.json(response)));
router
    .route("/:id")
    .delete((req, res) => products_controller_1.default.deleteProduct(req).then((response) => res.json(response)));
exports.default = router;

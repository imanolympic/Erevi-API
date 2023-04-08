"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const products_router_1 = __importDefault(require("./routers/products.router"));
const shipping_router_1 = __importDefault(require("./routers/shipping.router"));
const not_found_1 = __importDefault(require("./controllers/not-found"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// setup middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// configure routes
app.get("/", (req, res, next) => {
    res.send("API works!");
});
app.use("/api/products", products_router_1.default);
app.use("/api/shipping", shipping_router_1.default);
app.use("*", (_, res) => res.json((0, not_found_1.default)()));
const port = process.env.PORT || 5051;
app.listen(port, () => {
    console.log("listening on port:", port);
});
exports.default = app;

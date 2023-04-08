"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shipping_controller_1 = __importDefault(require("../controllers/shipping.controller"));
const router = express_1.default.Router();
router.route("/rate").post((req, res) => {
    shipping_controller_1.default
        .getShippingRates(req)
        .then((response) => res.json(response));
});
exports.default = router;

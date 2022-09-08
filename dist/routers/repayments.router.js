"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const repayments_controller_1 = require("../controllers/repayments.controller");
const router = express_1.default.Router();
router
    .route("")
    .post((_, res) => (0, repayments_controller_1.postRepayment)().then((response) => res.json(response)));
router
    .route("")
    .get((_, res) => (0, repayments_controller_1.getRepayments)().then((response) => res.json(response)));
exports.default = router;

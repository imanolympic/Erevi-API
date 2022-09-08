"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactions_controller_1 = require("../controllers/transactions.controller");
const router = express_1.default.Router();
router.route("").post((req, res) => {
    (0, transactions_controller_1.postTransaction)(req).then((response) => res.json(response));
});
router.route("").get((_, res) => {
    (0, transactions_controller_1.getTransactions)().then((response) => res.json(response));
});
router
    .route("")
    .patch((req, res) => (0, transactions_controller_1.patchTransaction)(req).then((response) => res.json(response)));
exports.default = router;

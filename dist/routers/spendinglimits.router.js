"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const spendinglimits_controller_1 = require("../controllers/spendinglimits.controller");
const router = express_1.default.Router();
router
    .route("")
    .get((_, res) => (0, spendinglimits_controller_1.getSpendinglimit)().then((response) => res.json(response)));
exports.default = router;

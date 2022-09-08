"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpendinglimit = void 0;
const spendinglimits_service_1 = require("../services/spendinglimits.service");
function getSpendinglimit() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, spendinglimits_service_1.listSpendinglimit)();
            return {
                headers: {
                    "Content-Type": "application/json",
                },
                statusCode: 200,
                body: Object.assign({}, result),
            };
        }
        catch (e) {
            console.log(e);
            return {
                headers: {
                    "Content-Type": "application/json",
                },
                statusCode: 400,
                body: {
                    error: e.message,
                },
            };
        }
    });
}
exports.getSpendinglimit = getSpendinglimit;

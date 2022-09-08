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
exports.getTransactions = exports.patchTransaction = exports.postTransaction = void 0;
const transactions_service_1 = require("../services/transactions.service");
function postTransaction(httpRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transactionInfo = httpRequest.body;
            const result = yield (0, transactions_service_1.addTransaction)(Object.assign({}, transactionInfo));
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
exports.postTransaction = postTransaction;
function patchTransaction(httpRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, transactions_service_1.updateTransaction)(httpRequest.body);
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
exports.patchTransaction = patchTransaction;
function getTransactions() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, transactions_service_1.listTransactions)();
            return {
                headers: {
                    "Content-Type": "application/json",
                },
                statusCode: 200,
                body: [...result],
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
exports.getTransactions = getTransactions;

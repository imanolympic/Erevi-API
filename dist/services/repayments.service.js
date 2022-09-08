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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRepayments = exports.addRepayment = void 0;
const transactions_db_1 = __importDefault(require("../data-access/transactions.db"));
const repayments_db_1 = __importDefault(require("../data-access/repayments.db"));
const spending_limits_db_1 = __importDefault(require("../data-access/spending-limits.db"));
function addRepayment() {
    return __awaiter(this, void 0, void 0, function* () {
        const outstandingTransactions = yield transactions_db_1.default.getOutstanding();
        if (outstandingTransactions.length === 0) {
            throw new Error("No outstanding transactions to be repaid.");
        }
        let amount = 0;
        for (const transaction of outstandingTransactions) {
            if (transaction.type === "purchase") {
                amount += transaction.amount;
            }
            else {
                amount -= transaction.amount;
            }
        }
        let recipient;
        if (amount === 0) {
            recipient = "N/A";
        }
        else if (amount > 0) {
            recipient = "Fizz";
        }
        else {
            recipient = "User";
        }
        const newRepayment = {
            amount: Math.abs(amount),
            recipient: recipient,
            transactionsCovered: outstandingTransactions.length,
        };
        yield repayments_db_1.default.insert(newRepayment);
        const ids = outstandingTransactions.map((transaction) => transaction._id.toString());
        yield transactions_db_1.default.updateByIds(ids, { repaid: true });
        const userId = "63041df3537b9ca0b7af9cff";
        yield spending_limits_db_1.default.updateById(userId, { limit: 50 });
        return {
            addCount: 1,
            message: "Repayment successfully added",
        };
    });
}
exports.addRepayment = addRepayment;
function listRepayments() {
    return __awaiter(this, void 0, void 0, function* () {
        const repayments = yield repayments_db_1.default.getAll();
        return repayments;
    });
}
exports.listRepayments = listRepayments;

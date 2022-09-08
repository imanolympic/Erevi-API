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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTransaction = exports.listOutstandingTransactions = exports.listTransactions = exports.addTransaction = void 0;
const transaction_entity_1 = __importDefault(require("../entities/transaction.entity"));
const transactions_db_1 = __importDefault(require("../data-access/transactions.db"));
const spending_limits_db_1 = __importDefault(require("../data-access/spending-limits.db"));
function addTransaction(transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = "63041df3537b9ca0b7af9cff";
        const spendingLimit = yield spending_limits_db_1.default.getById(userId);
        if (spendingLimit === undefined) {
            throw Error(`Spending limit with id '${userId}' not found`);
        }
        if (transaction.type === "purchase" &&
            transaction.amount > spendingLimit.limit) {
            throw Error(`Purchase exceeds spending limit.`);
        }
        const newTransaction = (0, transaction_entity_1.default)(Object.assign(Object.assign({}, transaction), { repaid: false, issuedRefund: transaction.type === "purchase" ? false : true }));
        yield transactions_db_1.default.insert(newTransaction);
        if (transaction.type === "purchase") {
            yield spending_limits_db_1.default.updateById(userId, {
                limit: spendingLimit.limit - transaction.amount,
            });
        }
        else {
            yield spending_limits_db_1.default.updateById(userId, {
                limit: spendingLimit.limit + transaction.amount,
            });
        }
        return {
            addCount: 1,
            message: "Transaction successfully added",
        };
    });
}
exports.addTransaction = addTransaction;
function listTransactions() {
    return __awaiter(this, void 0, void 0, function* () {
        const transactions = yield transactions_db_1.default.getAll();
        return transactions;
    });
}
exports.listTransactions = listTransactions;
function listOutstandingTransactions() {
    return __awaiter(this, void 0, void 0, function* () {
        const transactions = yield transactions_db_1.default.getOutstanding();
        return transactions;
    });
}
exports.listOutstandingTransactions = listOutstandingTransactions;
function updateTransaction(_a) {
    var { _id } = _a, changes = __rest(_a, ["_id"]);
    return __awaiter(this, void 0, void 0, function* () {
        if (_id === undefined) {
            throw new Error("Failed to provide id of object to update");
        }
        if (Object.keys(changes).length === 0) {
            throw new Error(`No changes provided to transaction with id '${_id}'`);
        }
        const existingTransaction = yield transactions_db_1.default.getById(_id);
        if (existingTransaction === undefined) {
            throw new Error(`Transaction with id '${_id}' not found`);
        }
        const updatedTransaction = (0, transaction_entity_1.default)(Object.assign(Object.assign({}, existingTransaction), changes));
        yield transactions_db_1.default.updateById(_id, updatedTransaction);
        return {
            updateCount: 1,
            message: `Transaction with id '${_id}' successfully updated`,
        };
    });
}
exports.updateTransaction = updateTransaction;

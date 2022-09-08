"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createTransaction({ title, type, amount, repaid, issuedRefund, }) {
    if (title === undefined) {
        throw new Error("Transaction must contain 'title' of type 'string'");
    }
    if (type === undefined) {
        throw new Error("Transaction must contain 'type' of type 'string'");
    }
    if (amount === undefined) {
        throw new Error("Transaction must contain 'amount' of type 'number'");
    }
    if (repaid === undefined) {
        throw new Error("Transaction must contain 'repaid' of type 'boolean'");
    }
    if (issuedRefund === undefined) {
        throw new Error("Transaction must contain 'issuedRefund' of type 'boolean'");
    }
    if (typeof title !== "string") {
        throw new Error("Transaction 'title' field must be of type 'string'");
    }
    if (typeof type !== "string") {
        throw new Error("Transaction 'type' field must be of type 'string'");
    }
    if (typeof amount !== "number") {
        throw new Error("Transaction 'amount' field must be of type 'number'");
    }
    if (typeof repaid !== "boolean") {
        throw new Error("Transaction 'repaid' field must be of type 'boolean'");
    }
    if (typeof issuedRefund !== "boolean") {
        throw new Error("Transaction 'issuedRefund' field must be of type 'boolean'");
    }
    return Object.freeze({
        title: title,
        type: type,
        amount: amount,
        repaid: repaid,
        issuedRefund: issuedRefund,
    });
}
exports.default = createTransaction;

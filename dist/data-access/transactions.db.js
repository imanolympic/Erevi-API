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
const mongodb_1 = require("mongodb");
const _1 = __importDefault(require("."));
const transactionsDb = {
    insert: function insert(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, _1.default)();
            const database = client.db("fizz");
            const collection = database.collection("transactions");
            const result = yield collection.insertOne(Object.assign({}, transaction));
            return result;
        });
    },
    getAll: function getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, _1.default)();
            const database = client.db("fizz");
            const collection = database.collection("transactions");
            const transactions = collection.find().toArray();
            return transactions;
        });
    },
    getOutstanding: function getOutstanding() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, _1.default)();
            const database = client.db("fizz");
            const collection = database.collection("transactions");
            const transactions = collection.find({ repaid: false }).toArray();
            return transactions;
        });
    },
    getById: function getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, _1.default)();
            const database = client.db("fizz");
            const collection = database.collection("transactions");
            const transaction = (yield collection.find({ _id: new mongodb_1.ObjectId(id) }).toArray()).at(0);
            return transaction;
        });
    },
    updateById: function updateById(id, updatedTransaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, _1.default)();
            const database = client.db("fizz");
            const collection = database.collection("transactions");
            const updateFilter = {
                _id: new mongodb_1.ObjectId(id),
            };
            const updateDocument = {
                $set: Object.assign({}, updatedTransaction),
            };
            const result = yield collection.updateOne(updateFilter, updateDocument);
            return result;
        });
    },
    updateByIds: function updateByIds(ids, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, _1.default)();
            const database = client.db("fizz");
            const collection = database.collection("transactions");
            const objectIds = ids.map((id) => new mongodb_1.ObjectId(id));
            const updateFilter = {
                _id: {
                    $in: objectIds,
                },
            };
            const updateDoc = {
                $set: Object.assign({}, changes),
            };
            const result = yield collection.updateMany(updateFilter, updateDoc);
            return result;
        });
    },
};
exports.default = transactionsDb;

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
const spendinglimitsDb = {
    getById: function getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, _1.default)();
            const database = client.db("fizz");
            const collection = database.collection("limits");
            const spendingLimit = (yield collection.find({ _id: new mongodb_1.ObjectId(id) }).toArray()).at(0);
            return spendingLimit;
        });
    },
    updateById: function updateById(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, _1.default)();
            const database = client.db("fizz");
            const collection = database.collection("limits");
            const updateFilter = {
                _id: new mongodb_1.ObjectId(id),
            };
            const updateDocument = {
                $set: Object.assign({}, changes),
            };
            const result = yield collection.updateOne(updateFilter, updateDocument);
            console.log(result);
            return result;
        });
    },
};
exports.default = spendinglimitsDb;

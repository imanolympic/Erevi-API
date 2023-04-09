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
const database_1 = __importDefault(require("./database"));
const productModel_1 = __importDefault(require("./productModel"));
class ProductsDb {
    insert(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, database_1.default)();
            const validatedProduct = new productModel_1.default(product);
            const result = yield client
                .db("salesData")
                .collection("products")
                .insertOne(validatedProduct);
            console.log("result: ", result);
            return result;
        });
    }
    update(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, database_1.default)();
            const validatedProduct = new productModel_1.default(product);
            const result = yield client
                .db("salesData")
                .collection("products")
                .updateOne({ id: id }, { $set: validatedProduct });
            return result;
        });
    }
    fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, database_1.default)();
            const result = yield client
                .db("salesData")
                .collection("products")
                .find()
                .toArray();
            return result;
        });
    }
    fetchById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, database_1.default)();
            const result = yield client
                .db("salesData")
                .collection("products")
                .findOne({ id: id });
            return result;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, database_1.default)();
            const result = yield client
                .db("salesData")
                .collection("products")
                .deleteOne({ id: id });
            return result;
        });
    }
}
exports.default = new ProductsDb();

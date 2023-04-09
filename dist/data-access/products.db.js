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
            yield (0, database_1.default)();
            const validatedProduct = new productModel_1.default(product);
            try {
                const result = yield validatedProduct.save();
                return result;
            }
            catch (error) {
                console.error("In products.db.ts, in __insert__, failed to add product to database due to error:", error);
                throw new Error("Failed to add product to database due to internal server error.");
            }
        });
    }
    update(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, database_1.default)();
            try {
                const result = yield productModel_1.default.findOneAndUpdate({ _id: id }, product, {
                    new: true,
                });
                return result;
            }
            catch (error) {
                console.error("In products.db.ts, in __update__, failed to update product in database due to error:", error);
                throw new Error("Failed to update product in database due to internal server error.");
            }
        });
    }
    fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, database_1.default)();
            try {
                const result = yield productModel_1.default.find();
                return result;
            }
            catch (error) {
                console.error("In products.db.ts, in __fetchAll__, failed to fetch products from database due to error:", error);
                throw new Error("Failed to fetch products from database due to internal server error.");
            }
        });
    }
    fetchById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, database_1.default)();
            try {
                const result = productModel_1.default.findById(id);
                return result;
            }
            catch (error) {
                console.error("In products.db.ts, in __fetchById__, failed to fetch product from database due to error:", error);
                throw new Error("Failed to fetch product from database due to internal server error.");
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, database_1.default)();
            try {
                const result = yield productModel_1.default.findByIdAndDelete(id);
                return result;
            }
            catch (error) {
                console.error("In products.db.ts, in __deleteById__, failed to delete product from database due to error:", error);
                throw new Error("Failed to delete product from database due to internal server error.");
            }
        });
    }
}
exports.default = new ProductsDb();

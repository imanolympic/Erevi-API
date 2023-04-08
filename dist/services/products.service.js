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
const product_entity_1 = __importDefault(require("../entities/product.entity"));
const products_db_1 = __importDefault(require("../data-access/products.db"));
class ProductsService {
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = (0, product_entity_1.default)(product);
            const result = yield products_db_1.default.insert(newProduct);
            return result;
        });
    }
    updateProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            if (product.id === undefined || product.id === null) {
                throw new Error(`Cannot update product with id '${product.id}'.`);
            }
            const parsedId = Number.parseInt(product.id);
            const existing_product = yield this.fetchProductById(product.id);
            if (Object.keys(existing_product).length === 0) {
                throw new Error(`Product with id '${product.id}' not found.`);
            }
            const updated_product = (0, product_entity_1.default)(Object.assign(Object.assign({}, existing_product), product));
            const result = yield products_db_1.default.update(parsedId, updated_product);
            return result;
        });
    }
    fetchProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield products_db_1.default.fetchAll();
            return result;
        });
    }
    fetchListedProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield products_db_1.default.fetchListed();
            return result;
        });
    }
    fetchProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedId = Number.parseInt(id);
            const result = yield products_db_1.default.fetchById(parsedId);
            return result;
        });
    }
    deleteProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedId = Number.parseInt(id);
            const result = yield products_db_1.default.deleteById(parsedId);
            return result;
        });
    }
}
exports.default = new ProductsService();

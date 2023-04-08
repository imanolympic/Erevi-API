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
const products_service_1 = __importDefault(require("../services/products.service"));
class ProductsController {
    postProduct(http_request) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = http_request.body;
            try {
                yield products_service_1.default.createProduct(product);
                return {
                    status: 200,
                    message: "Successfully created product.",
                    addCount: 1,
                };
            }
            catch (error) {
                console.log(error);
                return { status: 400, message: `${error}`, addCount: 0 };
            }
        });
    }
    putProduct(http_request) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = http_request.body;
            try {
                yield products_service_1.default.updateProduct(product);
                return {
                    status: 200,
                    message: "Successfully updated product.",
                    updateCount: 1,
                };
            }
            catch (error) {
                console.log(error);
                return { status: 400, message: `${error}`, updateCount: 0 };
            }
        });
    }
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield products_service_1.default.fetchProducts();
                return {
                    status: 200,
                    message: "Successfully fetched products.",
                    products: result,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 400,
                    message: `${error}`,
                    products: [],
                };
            }
        });
    }
    getListedProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield products_service_1.default.fetchListedProducts();
                return {
                    status: 200,
                    message: "Successfully fetched products.",
                    products: result,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 400,
                    message: `${error}`,
                    products: [],
                };
            }
        });
    }
    getProductById(http_request) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = http_request.params.id;
            try {
                const result = yield products_service_1.default.fetchProductById(id);
                return {
                    status: 200,
                    message: Object.keys(result).length === 0
                        ? `Product with id '${id}' not found.`
                        : "Successfully fetched product.",
                    product: result,
                };
            }
            catch (error) {
                console.log(error);
                return { status: 400, message: `${error}`, product: {} };
            }
        });
    }
    deleteProduct(http_request) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = http_request.params.id;
            try {
                yield products_service_1.default.deleteProductById(id);
                return {
                    status: 200,
                    message: "Successfully deleted product.",
                    deleteCount: 1,
                };
            }
            catch (error) {
                console.log(error);
                return { status: 400, message: `${error}`, deleteCount: 0 };
            }
        });
    }
}
exports.default = new ProductsController();

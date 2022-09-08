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
const _1 = __importDefault(require("."));
class ProductsDb {
    insert(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, _1.default)();
            try {
                const result = yield client.query("insert into products" +
                    "(title, description, price, listed, inventory, weight_lbs, height_inches, width_inches, depth_inches, image_url)" +
                    "values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [
                    product.title,
                    product.description,
                    product.price,
                    product.listed,
                    product.inventory,
                    product.weight_lbs,
                    product.height_inches,
                    product.width_inches,
                    product.depth_inches,
                    product.image_urls[0],
                ]);
                return result;
            }
            catch (error) {
                throw new Error("Something went wrong while adding the product to the database.");
            }
        });
    }
    fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, _1.default)();
            try {
                const result = yield client.query("select * from products");
                return result.rows;
            }
            catch (error) {
                throw new Error("Something went wrong while fetching products from the database.");
            }
        });
    }
    fetchById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, _1.default)();
            try {
                const result = yield client.query("select * from products where id = $1", [id]);
                if (result.rowCount == 1) {
                    return result.rows[0];
                }
                else {
                    return {};
                }
            }
            catch (error) {
                console.log(error);
                throw new Error("Something went wrong while fetching a product from the database.");
            }
        });
    }
}
exports.default = new ProductsDb();

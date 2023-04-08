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
                    "(title, description, price, listed, inventory, weight_lbs, height_inches, width_inches, length_inches, image_url)" +
                    "values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [
                    product.title,
                    product.description,
                    product.price,
                    product.listed,
                    product.inventory,
                    product.weight_lbs,
                    product.height_inches,
                    product.width_inches,
                    product.length_inches,
                    product.image_url,
                ]);
                return result;
            }
            catch (error) {
                console.log(error);
                throw new Error("Something went wrong while adding the product to the database.");
            }
        });
    }
    update(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, _1.default)();
            try {
                const result = yield client.query(`update products set \
        title = $2, \
        description = $3, \
        price = $4, \
        listed = $5, \
        inventory = $6, \
        weight_lbs = $7, \
        height_inches = $8, \
        width_inches = $9, \
        length_inches = $10, \
        image_url = $11 \
        where id = $1;`, [
                    id,
                    product.title,
                    product.description,
                    product.price,
                    product.listed,
                    product.inventory,
                    product.weight_lbs,
                    product.height_inches,
                    product.width_inches,
                    product.length_inches,
                    product.image_url,
                ]);
                return result.rowCount;
            }
            catch (error) {
                console.log(error);
                throw new Error("Something went wrong while updating the product in the database.");
            }
        });
    }
    fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, _1.default)();
            try {
                const result = yield client.query("select * from products order by title asc");
                return result.rows;
            }
            catch (error) {
                throw new Error("Something went wrong while fetching products from the database.");
            }
        });
    }
    fetchListed() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, _1.default)();
            try {
                const result = yield client.query("select * from products where inventory > 0 and listed = true order by title asc");
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
            let result;
            try {
                result = yield client.query("select * from products where id = $1", [id]);
            }
            catch (error) {
                console.log(error);
                throw new Error("Something went wrong while fetching a product from the database.");
            }
            if (result.rowCount == 1) {
                return result.rows[0];
            }
            else {
                throw new Error(`Product with id '${id}' not found.`);
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, _1.default)();
            try {
                const result = yield client.query("DELETE FROM products WHERE id = $1;", [
                    id,
                ]);
                return result;
            }
            catch (error) {
                console.log(error);
                throw new Error("Something went wrong while fetching a product from the database.");
            }
        });
    }
}
exports.default = new ProductsDb();

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
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
let cachedClient;
function connectClient() {
    return __awaiter(this, void 0, void 0, function* () {
        if (cachedClient) {
            return cachedClient;
        }
        const pool = new pg_1.Pool({
            host: process.env.EREVI_DB_HOST,
            database: process.env.EREVI_DB_NAME,
            user: process.env.EREVI_DB_USER,
            password: process.env.EREVI_DB_PASSWORD,
            port: 5432,
        });
        try {
            const client = yield pool.connect();
            console.log("DB successfully connected.");
            cachedClient = client;
            return cachedClient;
        }
        catch (error) {
            console.log("Unable to connect to DB.");
            console.log(error);
            process.exit(1);
        }
    });
}
exports.default = connectClient;

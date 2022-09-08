"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function notFound() {
    return {
        statusCode: 404,
        body: { error: "Page not found." },
    };
}
exports.default = notFound;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTRepository = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
require("dotenv").config({ path: ".env.example" });
class JWTRepository {
    generate(payload) {
        return (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET, {
            expiresIn: '9999 days'
        });
    }
    verify(key) {
        return (0, jsonwebtoken_1.verify)(key, process.env.JWT_SECRET);
    }
}
exports.JWTRepository = JWTRepository;

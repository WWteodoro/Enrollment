"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const AppError_1 = require("./errors/AppError");
const routes_1 = require("./routes");
require('dotenv').config({ path: '.env' });
const prisma = new client_1.PrismaClient();
prisma.$connect();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.route);
app.use((err, req, res, next) => {
    if (err instanceof AppError_1.AppError) {
        res.status(err.status).json({
            message: err.message
        });
        return;
    }
    res.status(500).json({
        message: `Internal Server Error - ${err.message}`
    });
    next();
});
app.listen(Number(process.env.PORT), () => {
    console.log('Initializate');
});

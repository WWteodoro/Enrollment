"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = __importDefault(require("express"));
const mainRoute_1 = require("./mainRoute");
const authRoute_1 = require("./authRoute");
const userRoute_1 = require("./userRoute");
const courseRoute_1 = require("./courseRoute");
exports.route = express_1.default.Router();
exports.route.use('/', mainRoute_1.mainRouter);
exports.route.use('/user', userRoute_1.userRoute);
exports.route.use('/auth', authRoute_1.userAuthenticateRoute);
exports.route.use('/courses', courseRoute_1.courseRoute);

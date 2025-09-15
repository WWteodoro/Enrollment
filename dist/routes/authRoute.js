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
exports.userAuthenticateRoute = void 0;
const express_1 = require("express");
const resolverController_1 = require("../adapters/resolverController");
const HashRepository_1 = require("../repositories/HashRepository");
const UserRepository_1 = require("../repositories/UserRepository");
const AuthenticateUserController_1 = require("./controllers/user/AuthenticateUserController");
const CryptoRepository_1 = require("../repositories/CryptoRepository");
const JWTRepository_1 = require("../repositories/JWTRepository");
exports.userAuthenticateRoute = (0, express_1.Router)();
const cryptoRepo = new CryptoRepository_1.CryptoRepository();
const userRepo = new UserRepository_1.UserRepository();
const jwtRepo = new JWTRepository_1.JWTRepository();
const hashRepo = new HashRepository_1.HashRepository();
const authenticateUserController = new AuthenticateUserController_1.AuthenticateUserController(userRepo, jwtRepo, hashRepo);
exports.userAuthenticateRoute.post("/login", (0, resolverController_1.resolveController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield authenticateUserController.handle(req, res);
})));

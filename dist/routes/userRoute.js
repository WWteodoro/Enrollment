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
exports.userRoute = void 0;
const express_1 = require("express");
const resolverController_1 = require("../adapters/resolverController");
const HashRepository_1 = require("../repositories/HashRepository");
const UserRepository_1 = require("../repositories/UserRepository");
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const DeleteUserController_1 = require("./controllers/user/DeleteUserController");
const GetUserController_1 = require("./controllers/user/GetUserController");
const ListUserController_1 = require("./controllers/user/ListUserController");
const UpdateUserController_1 = require("./controllers/user/UpdateUserController");
const GetUserByEmailController_1 = require("./controllers/user/GetUserByEmailController");
exports.userRoute = (0, express_1.Router)();
const userRepo = new UserRepository_1.UserRepository();
const hashRepo = new HashRepository_1.HashRepository();
const createUserController = new CreateUserController_1.CreateUserController(userRepo, hashRepo);
const getUserController = new GetUserController_1.GetUserController(userRepo);
const listUsersController = new ListUserController_1.ListUsersController(userRepo);
const updateUserController = new UpdateUserController_1.UpdateUserController(userRepo);
const deleteUserController = new DeleteUserController_1.DeleteUserController(userRepo);
const getByEmailUsersController = new GetUserByEmailController_1.GetUserByEmailController(userRepo);
exports.userRoute.post('/auth/signup', (0, resolverController_1.resolveController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield createUserController.handle(req, res);
})));
exports.userRoute.get('/:id', (0, resolverController_1.resolveController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield getUserController.handle(req, res);
})));
exports.userRoute.get('/', (0, resolverController_1.resolveController)((_, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield listUsersController.handle(_, res);
})));
exports.userRoute.put('/:id', (0, resolverController_1.resolveController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield updateUserController.handle(req, res);
})));
exports.userRoute.delete('/:id', (0, resolverController_1.resolveController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield deleteUserController.handle(req, res);
})));
exports.userRoute.get('/email/:email', (0, resolverController_1.resolveController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield getByEmailUsersController.handle(req, res);
})));

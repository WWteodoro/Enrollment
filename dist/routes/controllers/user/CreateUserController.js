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
exports.CreateUserController = void 0;
const CreateUserService_1 = require("../../../services/UserService/CreateUserService");
class CreateUserController {
    constructor(userRepo, hashRepo) {
        this.userRepo = userRepo;
        this.hashRepo = hashRepo;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, password, email } = req.body;
            const createUserService = new CreateUserService_1.CreateUserService(this.userRepo, this.hashRepo);
            const result = yield createUserService.execute({ name, email, password });
            return res.status(201).json(result);
        });
    }
}
exports.CreateUserController = CreateUserController;

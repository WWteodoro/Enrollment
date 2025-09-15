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
exports.ListUsersController = void 0;
const ListUserService_1 = require("../../../services/UserService/ListUserService");
class ListUsersController {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    handle(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listUsersService = new ListUserService_1.ListUsersService(this.userRepo);
            const users = yield listUsersService.execute();
            return res.json(users);
        });
    }
}
exports.ListUsersController = ListUsersController;

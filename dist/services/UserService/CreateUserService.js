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
exports.CreateUserService = void 0;
const user_1 = require("../../entities/user");
class CreateUserService {
    constructor(userRepo, hashRepo) {
        this.userRepo = userRepo;
        this.hashRepo = hashRepo;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password, name }) {
            password = yield this.hashRepo.cryptographie(password);
            const user = new user_1.User({ email, password, name });
            const result = yield this.userRepo.insert(user.toJson());
            return result;
        });
    }
}
exports.CreateUserService = CreateUserService;

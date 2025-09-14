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
exports.UpdateUserService = void 0;
const user_1 = require("../../entities/user");
class UpdateUserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, name, email, password }) {
            const result = yield this.userRepo.findOneUser(id);
            const user = new user_1.User({
                name: name || result.name,
                email: email || result.email,
                password: password || result.password,
            }, result.id);
            yield this.userRepo.update(user.toJson(), id);
        });
    }
}
exports.UpdateUserService = UpdateUserService;

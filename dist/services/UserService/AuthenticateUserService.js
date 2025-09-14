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
exports.AuthenticateUserService = void 0;
const AppError_1 = require("../../errors/AppError");
class AuthenticateUserService {
    constructor(userRepo, jwtRepo, hashRepo) {
        this.userRepo = userRepo;
        this.jwtRepo = jwtRepo;
        this.hashRepo = hashRepo;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            const user = yield this.userRepo.findUserByEmail(email);
            if (user) {
                console.log(user.password, "===", password);
                const b = yield this.hashRepo.uncryptographie(password, user.password);
                if (b === true) {
                    const token = this.jwtRepo.generate({ email: user.name, id: user.id });
                    console.log(token);
                    return { user, token };
                }
                else
                    throw new AppError_1.AppError("Incorrect password");
            }
            else
                throw new AppError_1.AppError("This user doesn't exists");
        });
    }
}
exports.AuthenticateUserService = AuthenticateUserService;

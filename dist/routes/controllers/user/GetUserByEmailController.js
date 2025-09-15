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
exports.GetUserByEmailController = void 0;
const GetUserByEmailService_1 = require("../../../services/UserService/GetUserByEmailService");
class GetUserByEmailController {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            const getUserByEmailService = new GetUserByEmailService_1.GetUserByEmailService(this.userRepo);
            const result = yield getUserByEmailService.execute({ email });
            return res.status(200).json(result);
        });
    }
}
exports.GetUserByEmailController = GetUserByEmailController;

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
exports.UserRepository = void 0;
const AppError_1 = require("../errors/AppError");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserRepository {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma.user.findMany();
            return result;
        });
    }
    insert(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma.user.create({
                data: { id: props.id, name: props.name, email: props.email, password: props.password, role: props.role || "student" }
            });
            return result;
        });
    }
    findOneUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma.user.findUnique({
                where: { id }
            });
            if (!result)
                throw new AppError_1.AppError('User not found');
            return result;
        });
    }
    update(props, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma.user.update({
                where: { id },
                data: { id: props.id, name: props.name, email: props.email, password: props.password, role: props.role },
            });
            return result;
        });
    }
    ;
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.user.delete({
                where: { id }
            });
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma.user.findUnique({
                where: { email }
            });
            if (!result)
                throw new Error('User not found');
            return result;
        });
    }
}
exports.UserRepository = UserRepository;

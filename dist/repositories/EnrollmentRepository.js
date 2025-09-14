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
exports.EnrollmentRepository = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = require("../errors/AppError");
const prisma = new client_1.PrismaClient();
class EnrollmentRepository {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma.enrollment.findMany();
            return result;
        });
    }
    create(props) {
        return __awaiter(this, void 0, void 0, function* () {
            props.status = "pending_payment";
            const user = yield prisma.user.findUnique({
                where: { id: props.studentId }
            });
            if (!user)
                throw new AppError_1.AppError("User not found");
            const enrollmentAlreadyExists = yield prisma.enrollment.findUnique({
                where: {
                    studentId_courseId: {
                        studentId: props.studentId,
                        courseId: props.courseId
                    }
                }
            });
            if (enrollmentAlreadyExists)
                throw new AppError_1.AppError("Enrollment Already Exists");
            const capacity = yield prisma.course.findFirst({
                where: { id: props.courseId }
            });
            if (!capacity)
                throw new AppError_1.AppError("Course does not exists");
            if (capacity.capacity === null)
                capacity.capacity = 9999999;
            if (capacity.capacity <= 0)
                throw new AppError_1.AppError("Full Capacity Reached");
            capacity.capacity = capacity.capacity - 1;
            const result = yield prisma.enrollment.create({
                data: props
            });
            yield prisma.course.update({
                where: { id: capacity.id },
                data: capacity
            });
            return result;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma.enrollment.findUnique({
                where: { id }
            });
            if (!result)
                throw new AppError_1.AppError("Enrollment does not exists");
            return result;
        });
    }
}
exports.EnrollmentRepository = EnrollmentRepository;

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
exports.CreateEnrollmentService = void 0;
const enrollment_1 = require("../../entities/enrollment");
const publisher_1 = require("../../utills/publisher");
class CreateEnrollmentService {
    constructor(enrollmentRepo) {
        this.enrollmentRepo = enrollmentRepo;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const enrollment = new enrollment_1.Enrollment(data);
            const result = yield this.enrollmentRepo.create(enrollment.toJson());
            yield publisher_1.publisher.publish("payment_requested", {
                enrollmentId: result.id,
                studentId: result.studentId,
                courseId: result.courseId
            });
            return result;
        });
    }
}
exports.CreateEnrollmentService = CreateEnrollmentService;

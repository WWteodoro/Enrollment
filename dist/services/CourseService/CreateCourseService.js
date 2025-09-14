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
exports.CreateCourseService = void 0;
const course_1 = require("../../entities/course");
class CreateCourseService {
    constructor(courseRepo) {
        this.courseRepo = courseRepo;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ title, slug, priceCents, capacity }) {
            const course = new course_1.Course({ title, slug, priceCents, capacity });
            const result = yield this.courseRepo.create(course.toJson());
            return result;
        });
    }
}
exports.CreateCourseService = CreateCourseService;

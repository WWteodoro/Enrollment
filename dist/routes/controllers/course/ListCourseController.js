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
exports.ListCourseController = void 0;
const ListCourseService_1 = require("../../../services/CourseService/ListCourseService");
class ListCourseController {
    constructor(courseRepo) {
        this.courseRepo = courseRepo;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listCourseService = new ListCourseService_1.ListCourseService(this.courseRepo);
            const courses = yield listCourseService.execute();
            return res.json(courses);
        });
    }
}
exports.ListCourseController = ListCourseController;

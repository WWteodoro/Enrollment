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
exports.GetCourseController = void 0;
const GetCourseService_1 = require("../../../services/CourseService/GetCourseService");
class GetCourseController {
    constructor(courseRepo) {
        this.courseRepo = courseRepo;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idOrSlug } = req.params;
            const getCourseService = new GetCourseService_1.GetCourseService(this.courseRepo);
            const result = yield getCourseService.execute({ idOrSlug });
            return res.json(result);
        });
    }
}
exports.GetCourseController = GetCourseController;

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
exports.GetPageCourseController = void 0;
const GetPageCourseService_1 = require("../../../services/CourseService/GetPageCourseService");
class GetPageCourseController {
    constructor(courseRepo) {
        this.courseRepo = courseRepo;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { q, page, perPage, minPrice, maxPrice } = req.query;
            const getPageCourseService = new GetPageCourseService_1.GetPageCourseService(this.courseRepo);
            const result = yield getPageCourseService.execute({
                q: q,
                page: page ? Number(page) : 1,
                perPage: perPage ? Number(perPage) : 10,
                minPrice: minPrice ? Number(minPrice) : undefined,
                maxPrice: maxPrice ? Number(maxPrice) : undefined
            });
            return res.json(result);
        });
    }
}
exports.GetPageCourseController = GetPageCourseController;

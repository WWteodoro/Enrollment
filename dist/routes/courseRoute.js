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
exports.courseRoute = void 0;
const express_1 = require("express");
const resolverController_1 = require("../adapters/resolverController");
const CourseRepository_1 = require("../repositories/CourseRepository");
const CreateCourseController_1 = require("./controllers/course/CreateCourseController");
const GetCourseController_1 = require("./controllers/course/GetCourseController");
const GetPageCourseController_1 = require("./controllers/course/GetPageCourseController");
const ListCourseController_1 = require("./controllers/course/ListCourseController");
exports.courseRoute = (0, express_1.Router)();
const courseRepo = new CourseRepository_1.CourseRepository();
const createCourseController = new CreateCourseController_1.CreateCourseController(courseRepo);
const getCourseController = new GetCourseController_1.GetCourseController(courseRepo);
const getPageCourseController = new GetPageCourseController_1.GetPageCourseController(courseRepo);
const listCourseController = new ListCourseController_1.ListCourseController(courseRepo);
exports.courseRoute.post('/', (0, resolverController_1.resolveController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield createCourseController.handle(req, res);
})));
exports.courseRoute.get('/', (0, resolverController_1.resolveController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield listCourseController.handle(req, res);
})));
exports.courseRoute.get('/get/:idOrSlug', (0, resolverController_1.resolveController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield getCourseController.handle(req, res);
})));
exports.courseRoute.get('/paginated', (0, resolverController_1.resolveController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield getPageCourseController.handle(req, res);
})));

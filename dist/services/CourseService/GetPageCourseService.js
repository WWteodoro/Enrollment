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
exports.GetPageCourseService = void 0;
const logger_1 = require("../../utills/logger");
const redis_1 = require("../../utills/redis");
class GetPageCourseService {
    constructor(courseRepo) {
        this.courseRepo = courseRepo;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ q, page = 1, perPage = 10, minPrice, maxPrice }) {
            const cacheKey = `courses:${q || ''}:${page}:${perPage}:${minPrice || ''}:${maxPrice || ''}`;
            const cached = yield redis_1.redis.get(cacheKey);
            if (cached) {
                logger_1.Logger.info(`Cache HIT: ${cacheKey}`);
                return JSON.parse(cached);
            }
            const result = yield this.courseRepo.getByPage({
                q,
                page,
                perPage,
                minPrice,
                maxPrice
            });
            yield redis_1.redis.set(cacheKey, JSON.stringify(result), {
                EX: 60
            });
            logger_1.Logger.info(`Cache MISS: ${cacheKey}`);
            return result;
        });
    }
}
exports.GetPageCourseService = GetPageCourseService;

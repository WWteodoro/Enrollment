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
exports.CourseRepository = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = require("../errors/AppError");
const isUUID_1 = require("../utills/isUUID");
const prisma = new client_1.PrismaClient();
class CourseRepository {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma.course.findMany();
            return result;
        });
    }
    create(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma.course.create({
                data: props
            });
            return result;
        });
    }
    getByPage(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { q, page = 1, perPage = 10, minPrice, maxPrice } = props;
            const where = {};
            if (q) {
                where.OR = [
                    { title: { contains: q, mode: 'insensitive' } },
                    { slug: { contains: q, mode: 'insensitive' } }
                ];
            }
            if (minPrice || maxPrice) {
                where.priceCents = {};
                if (minPrice)
                    where.priceCents.gte = minPrice;
                if (maxPrice)
                    where.priceCents.lte = maxPrice;
            }
            const skip = (page - 1) * perPage;
            const take = perPage;
            const [data, total] = yield Promise.all([
                prisma.course.findMany({
                    where,
                    skip,
                    take,
                    orderBy: { createdAt: 'desc' }
                }),
                prisma.course.count({ where })
            ]);
            return {
                data,
                total,
                page,
                perPage
            };
        });
    }
    get(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idOrSlug } = props;
            let result;
            if ((0, isUUID_1.isUUID)(idOrSlug)) {
                result = yield prisma.course.findUnique({
                    where: { id: idOrSlug }
                });
            }
            else {
                result = yield prisma.course.findUnique({
                    where: { slug: idOrSlug }
                });
            }
            if (!result) {
                throw new AppError_1.AppError("Course not found", 404);
            }
            return result;
        });
    }
}
exports.CourseRepository = CourseRepository;

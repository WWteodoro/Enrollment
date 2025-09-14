import { PrismaClient } from "@prisma/client";
import { ICourseRepository } from "../interfaces/ICourseRepository";
import { ICourse, ICourseGetPageRequest, ICourseGetRequest } from "../interfaces/ICourseInterface";
import { AppError } from "../errors/AppError";

const prisma = new PrismaClient();
export class CourseRepository implements ICourseRepository{
    constructor(){}
    async findAll(): Promise<ICourse[]> {
        const result = await prisma.course.findMany()
        return result
    }

    async create(props: ICourse): Promise<ICourse> {
        const result = await prisma.course.create({
            data: {props}
        })

        return result
    }

    async getByPage(props: ICourseGetPageRequest): Promise<{
        data: ICourse[];
        total: number;
        page: number;
        perPage: number;
        }> {
        const {
            q,
            page = 1,
            perPage = 10,
            minPrice,
            maxPrice
        } = props;

        const where: any = {};

        if (q) {
            where.OR = [
            { title: { contains: q, mode: 'insensitive' } },
            { slug: { contains: q, mode: 'insensitive' } }
            ];
        }

        if (minPrice || maxPrice) {
            where.priceCents = {};
            if (minPrice) where.priceCents.gte = minPrice;
            if (maxPrice) where.priceCents.lte = maxPrice;
        }

        const skip = (page - 1) * perPage;
        const take = perPage;

        const [data, total] = await Promise.all([
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
    }

    async get(props: ICourseGetRequest): Promise<ICourse> {
        let result = await prisma.course.findUnique({
            where: { id: props.idOrSlug}
        })

        if(!result){
            result = await prisma.course.findUnique({
                where: {slug: props.idOrSlug}
            })

            if(!result) throw new AppError("User not found");

            return result
        } else {
            return result
        }
    }
    
}
import { Course } from "../../entities/course";
import { ICourse, ICourseCreateRequest } from "../../interfaces/ICourseInterface";
import { ICourseRepository } from "../../interfaces/ICourseRepository";

export class CreateCourseService{
    constructor(private courseRepo: ICourseRepository){}
    async execute({title,slug,priceCents,capacity}: ICourseCreateRequest): Promise<ICourse>{
        const course = new Course({title,slug,priceCents,capacity})

        const result = await this.courseRepo.create(course.toJson())

        return result
    }
}
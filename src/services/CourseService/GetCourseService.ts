import { ICourse, ICourseGetRequest } from "../../interfaces/ICourseInterface";
import { ICourseRepository } from "../../interfaces/ICourseRepository";

export class GetCourseService{
    constructor(private courseRepo: ICourseRepository){}
    async execute({idOrSlug}: ICourseGetRequest): Promise<ICourse>{
        const result = await this.courseRepo.get({idOrSlug})
        return result
    }
}
import { ICourse } from "../../interfaces/ICourseInterface";
import { ICourseRepository } from "../../interfaces/ICourseRepository";

export class ListCourseService{
    constructor(private courseRepo: ICourseRepository){}
    async execute(): Promise<ICourse[]>{
        const result = await this.courseRepo.findAll()
        return result
    }
}
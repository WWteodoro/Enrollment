import { Request, Response } from "express";
import { ICourseRepository } from "../../../interfaces/ICourseRepository";
import { ListCourseService } from "../../../services/CourseService/ListCourseService";

export class ListCourseController{
    constructor(private courseRepo: ICourseRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const listCourseService = new ListCourseService(this.courseRepo)
        const courses = await listCourseService.execute()

        return res.json(courses)
    }
}
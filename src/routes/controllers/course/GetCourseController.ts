import { Request, Response } from "express";
import { ICourseRepository } from "../../../interfaces/ICourseRepository";
import { GetCourseService } from "../../../services/CourseService/GetCourseService";

export class GetCourseController{
    constructor(private courseRepo: ICourseRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const { idOrSlug} = req.params;

        const getCourseService = new GetCourseService(this.courseRepo)
        const result = await getCourseService.execute({ idOrSlug})

        return res.json(result)
    }
}
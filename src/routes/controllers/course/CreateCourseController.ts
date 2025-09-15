import { Request, Response } from "express";
import { ICourseRepository } from "../../../interfaces/ICourseRepository";
import { CreateCourseService } from "../../../services/CourseService/CreateCourseService";

export class CreateCourseController{
    constructor(private courseRepo: ICourseRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const{ title,slug,priceCents,capacity} = req.body;

        const createCourseService = new CreateCourseService(this.courseRepo)
        const result = await createCourseService.execute({title,slug,priceCents,capacity})

        return res.status(201).json(result)
    }
}
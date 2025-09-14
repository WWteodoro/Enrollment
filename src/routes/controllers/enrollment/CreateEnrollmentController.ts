import { Request, Response } from "express";
import { IEnrollmentRepository } from "../../../interfaces/IEnrollmentRepository";
import { CreateEnrollmentService } from "../../../services/EnrollmentService/CreateEnrollmentService";

export class CreateEnrollmentController{
    constructor(private enrollmentRepo: IEnrollmentRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const { studentId, courseId, status } = req.body;

        const createEnrollmentService = new CreateEnrollmentService(this.enrollmentRepo)
        const result = await createEnrollmentService.execute({ studentId, courseId, status })

        return res.status(201).json(result)
    }
}
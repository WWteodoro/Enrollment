import { Request, Response } from "express";
import { IEnrollmentRepository } from "../../../interfaces/IEnrollmentRepository";
import { ListEnrollmentService } from "../../../services/EnrollmentService/ListEnrollmentService";

export class ListEnrollmentController{
    constructor(private enrollmentRepo: IEnrollmentRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const listEnrollmentService = new ListEnrollmentService(this.enrollmentRepo)
        const enrollments = await listEnrollmentService.execute()

        return res.json(enrollments)
    }
}
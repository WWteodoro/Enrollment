import { Request, Response } from "express";
import { IEnrollmentRepository } from "../../../interfaces/IEnrollmentRepository";
import { DeleteEnrollmentService } from "../../../services/EnrollmentService/DeleteEnrollmentService";

export class DeleteEnrollmentController{
    constructor(private enrollmentRepo: IEnrollmentRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const {id} = req.params;

        const deleteEnrollmentService = new DeleteEnrollmentService(this.enrollmentRepo)
        await deleteEnrollmentService.execute({id})

        return res.status(200).send()
    }
}
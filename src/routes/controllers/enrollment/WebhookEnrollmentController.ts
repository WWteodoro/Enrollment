import { Request, Response } from "express";
import { IEnrollmentRepository } from "../../../interfaces/IEnrollmentRepository";
import { WebhookEnrollmentService } from "../../../services/EnrollmentService/WebhookEnrollmentService";

export class WebhookEnrollmentController{
    constructor(private enrollmentRepo: IEnrollmentRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
        const { id, status } = req.params

        const webhookEnrollmentService = new WebhookEnrollmentService(this.enrollmentRepo)
        const result = await webhookEnrollmentService.execute({id, status})

        return res.status(201).json(result)
    }

}
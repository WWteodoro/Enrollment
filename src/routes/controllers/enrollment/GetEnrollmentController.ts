import { Request, Response } from "express";
import { IEnrollmentRepository } from "../../../interfaces/IEnrollmentRepository";
import { GetEnrollmentService } from "../../../services/EnrollmentService/GetEnrollmentService";

export class GetEnrollmentController{
    constructor(private enrollmentRepo: IEnrollmentRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
      const { id } = req.params;
      
      const getEnrollmentService = new GetEnrollmentService(this.enrollmentRepo)
      const result = await getEnrollmentService.execute({id})

      return res.status(200).json(result)
    }
}
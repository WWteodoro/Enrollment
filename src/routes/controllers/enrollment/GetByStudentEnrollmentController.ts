import { Request, Response } from "express";
import { IEnrollmentRepository } from "../../../interfaces/IEnrollmentRepository";
import { GetByStudentEnrollmentService } from "../../../services/EnrollmentService/GetByStudentEnrollmentService";

export class GetByStudentEnrollmentController{
    constructor(private enrollmentRepo: IEnrollmentRepository){}
    async handle(req: Request, res: Response): Promise<Response>{
      const { id } = req.params;
      
      const getByStudentEnrollmentService = new GetByStudentEnrollmentService(this.enrollmentRepo)
      const result = await getByStudentEnrollmentService.execute({id})

      return res.status(200).json(result)
    }
}
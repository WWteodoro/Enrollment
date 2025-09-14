import { IEnrollment, IEnrollmentGetByStudentRequest, IEnrollmentGetRequest } from "../../interfaces/IEnrollmentInterface";
import { IEnrollmentRepository } from "../../interfaces/IEnrollmentRepository";

export class GetByStudentEnrollmentService{
    constructor(private enrollmentRepo: IEnrollmentRepository){}
    async execute({id}: IEnrollmentGetByStudentRequest): Promise<IEnrollment[]>{
        const result = await this.enrollmentRepo.getByStudent(id)

        return result
    }
}
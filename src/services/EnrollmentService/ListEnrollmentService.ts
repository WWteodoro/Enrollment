import { IEnrollment } from "../../interfaces/IEnrollmentInterface";
import { IEnrollmentRepository } from "../../interfaces/IEnrollmentRepository";

export class ListEnrollmentService{
    constructor(private enrollmentRepo: IEnrollmentRepository){}
    async execute(): Promise<IEnrollment[]>{
        const result = await this.enrollmentRepo.findAll()

        return result
    }
}
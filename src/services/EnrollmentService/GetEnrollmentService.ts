import { IEnrollment, IEnrollmentGetRequest } from "../../interfaces/IEnrollmentInterface";
import { IEnrollmentRepository } from "../../interfaces/IEnrollmentRepository";

export class GetEnrollmentService{
    constructor(private enrollmentRepo: IEnrollmentRepository){}
    async execute({id}: IEnrollmentGetRequest): Promise<IEnrollment>{
        const result = await this.enrollmentRepo.get(id)

        return result
    }
}
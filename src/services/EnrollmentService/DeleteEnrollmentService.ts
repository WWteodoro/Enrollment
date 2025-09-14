import { IEnrollmentDeleteRequest } from "../../interfaces/IEnrollmentInterface";
import { IEnrollmentRepository } from "../../interfaces/IEnrollmentRepository";


export class DeleteEnrollmentService{
    constructor(private enrollmentRepo: IEnrollmentRepository){}
    async execute({id}: IEnrollmentDeleteRequest): Promise<void>{
        await this.enrollmentRepo.delete(id)
    }
}
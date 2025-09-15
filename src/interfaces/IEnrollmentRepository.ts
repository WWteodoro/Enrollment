import { IEnrollment, IEnrollmentWebhook } from "./IEnrollmentInterface";

export interface IEnrollmentRepository{
    findAll(): Promise<IEnrollment[]>
    create(props: IEnrollment): Promise<IEnrollment>
    get(id: string): Promise<IEnrollment>
    getByStudent(id:string):Promise<IEnrollment[]>
    delete(id:string):Promise<void>
    webhook(props: IEnrollmentWebhook): Promise<IEnrollment>
}
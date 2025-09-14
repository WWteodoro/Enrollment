import { IEnrollment } from "./IEnrollmentInterface";

export interface IEnrollmentRepository{
    findAll(): Promise<IEnrollment[]>
    create(props: IEnrollment): Promise<IEnrollment>
    get(id: string): Promise<IEnrollment>
}
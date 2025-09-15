import { IEnrollment } from "../interfaces/IEnrollmentInterface";
import { createUUID } from "../utills/createUUID";

export class Enrollment{
    id: IEnrollment['id'];
    studentId: IEnrollment['studentId'];
    courseId: IEnrollment['courseId'];
    status: IEnrollment['status'];
    createdAt?: IEnrollment['createdAt']
    updatedAt?: IEnrollment['updatedAt']

    constructor(props: Omit<IEnrollment, 'id'>, id?:string){
        this.id = id || createUUID();
        this.studentId = props.studentId;
        this.courseId = props.courseId;
        this.status = props.status;
        this.createdAt = props.createdAt || new Date();
        this.updatedAt = new Date()
    }

    toJson(): IEnrollment{
        return{
            id: this.id,
            studentId: this.studentId,
            courseId: this.courseId,
            status: this.status,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }
}
import { Enrollment } from "../../entities/enrollment";
import { IEnrollmentWebhook } from "../../interfaces/IEnrollmentInterface";
import { IEnrollmentRepository } from "../../interfaces/IEnrollmentRepository";

export class WebhookEnrollmentService{
    constructor(private enrollmentRepo: IEnrollmentRepository){}
    async execute(props: IEnrollmentWebhook): Promise<Enrollment>{
        const result = await this.enrollmentRepo.get(props.id)

        let enrollment = new Enrollment({
            status: props.status || result.status,
            studentId: result.studentId,
            courseId: result.courseId
        }, props.id)

        const ret = await this.enrollmentRepo.webhook(props)

        enrollment.status = ret.status

        return enrollment
    }
}
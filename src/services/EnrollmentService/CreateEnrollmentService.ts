import { Enrollment } from "../../entities/enrollment";
import { IEnrollment, IEnrollmentCreateRequest } from "../../interfaces/IEnrollmentInterface";
import { IEnrollmentRepository } from "../../interfaces/IEnrollmentRepository";
import { publisher } from "../../utills/publisher";

export class CreateEnrollmentService {
  constructor(private enrollmentRepo: IEnrollmentRepository) {}

  async execute(data: IEnrollmentCreateRequest): Promise<IEnrollment> {
    const enrollment = new Enrollment(data);

    const result = await this.enrollmentRepo.create(enrollment.toJson());

    await publisher.publish("payment_requested", {
      enrollmentId: result.id,
      studentId: result.studentId,
      courseId: result.courseId
    });

    return result;
  }
}
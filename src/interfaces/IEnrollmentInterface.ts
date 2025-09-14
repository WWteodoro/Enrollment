export interface IEnrollment {
    id: string;
    studentId: string;
    courseId: string;
    status: string;
    createdAt?: Date
    updatedAt?: Date
}

export interface IEnrollmentCreateRequest{
    studentId: string;
    courseId: string;
    status: string | "pending_payment";
}

export interface IEnrollmentGetRequest{
    id: string
}

export interface IEnrollmentGetByStudentRequest{
    id: string
}


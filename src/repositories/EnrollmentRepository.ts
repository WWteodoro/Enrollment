import { PrismaClient } from "@prisma/client";
import { IEnrollmentRepository } from "../interfaces/IEnrollmentRepository";
import { IEnrollment } from "../interfaces/IEnrollmentInterface";
import { AppError } from "../errors/AppError";

const prisma = new PrismaClient();
export class EnrollmentRepository implements IEnrollmentRepository{
    constructor(){}
    async findAll(): Promise<IEnrollment[]> {
        const result = await prisma.enrollment.findMany()
        return result
    }

    async create(props: IEnrollment): Promise<IEnrollment> {
        props.status = "pending_payment"
        
        const user = await prisma.user.findUnique({
            where: {id: props.studentId}
        })

        if(!user) throw new AppError("User not found");

        const enrollmentAlreadyExists = await prisma.enrollment.findUnique({
            where: {studentId: props.studentId, courseId: props.courseId}
        })

        if(enrollmentAlreadyExists) throw new AppError("Enrollment Already Exists");

        const capacity = await prisma.course.findFirst({
            where: {id: props.courseId}
        })

        if(!capacity) throw new AppError("Course does not exists");

        if(capacity.capacity <=0) throw new AppError("Full Capacity Reached")

        capacity.capacity = capacity.capacity -1;

        const result = await prisma.enrollment.create({
            data: props
        })

        await prisma.course.update({
            where: {id: capacity.id},
            data: capacity
        })

        return result
    }

    async get(id: string): Promise<IEnrollment> {
        const result = await prisma.enrollment.findUnique({
            where: { id }
        })

        if(!result) throw new AppError("Enrollment does not exists")

        return result
    }
}
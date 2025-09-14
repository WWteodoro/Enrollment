import { PrismaClient } from "@prisma/client";
import { IEnrollmentRepository } from "../interfaces/IEnrollmentRepository";
import { IEnrollment } from "../interfaces/IEnrollmentInterface";
import { AppError } from "../errors/AppError";

const prisma = new PrismaClient();
export class EnrollmentRepository implements IEnrollmentRepository{
    constructor(){}
    async delete(id: string): Promise<void> {
        const result = await prisma.enrollment.findUnique({
            where: {id}
        })

        if(!result) throw new AppError("Enrollment doesn't exists");

        if(result.status === "pending_payment"){
            await prisma.enrollment.delete({
                where: {id}
            })
        } else {
            throw new AppError("Cannot exit to this course")
        }
    }

    async getByStudent(id: string): Promise<IEnrollment[]> {
        const user = await prisma.user.findUnique({
            where: {id}
        })

        if(!user) throw new AppError("User not found");

        if(user.role === "admin"){
            const result = await prisma.enrollment.findMany({})
            return result
        } else {
            const result = await prisma.enrollment.findMany({
                where: {studentId: id}
            })
            return result
        }
    }

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
            where: {
                studentId_courseId: {
                studentId: props.studentId,
                courseId: props.courseId
               }
            }
        });


        if(enrollmentAlreadyExists) throw new AppError("Enrollment Already Exists");

        const capacity = await prisma.course.findFirst({
            where: {id: props.courseId}
        })

        if(!capacity) throw new AppError("Course does not exists");

        if(capacity.capacity === null) capacity.capacity = 9999999

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
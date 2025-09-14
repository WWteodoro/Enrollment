import { Request, Response, Router } from "express";
import { EnrollmentRepository } from "../repositories/EnrollmentRepository";
import { CreateEnrollmentController } from "./controllers/enrollment/CreateEnrollmentController";
import { GetEnrollmentController } from "./controllers/enrollment/GetEnrollmentController";
import { ListEnrollmentController } from "./controllers/enrollment/ListEnrollmentController";
import { resolveController } from "../adapters/resolverController";
import { GetByStudentEnrollmentController } from "./controllers/enrollment/GetByStudentEnrollmentController";

export const enrollmentRoute = Router();

const enrollmentRepo = new EnrollmentRepository();
const createEnrollmentController = new CreateEnrollmentController(enrollmentRepo)
const getEnrollmentController = new GetEnrollmentController(enrollmentRepo)
const listEnrollmentController = new ListEnrollmentController(enrollmentRepo)
const getByStudentEnrollmentController = new GetByStudentEnrollmentController(enrollmentRepo)

enrollmentRoute.post('/', resolveController(async (req: Request, res: Response) => {
    return await createEnrollmentController.handle(req,res)
}))

enrollmentRoute.get('/', resolveController(async (req: Request, res: Response) => {
    return await listEnrollmentController.handle(req,res)
}))

enrollmentRoute.get('/:id', resolveController(async (req: Request, res: Response) => {
    return await getEnrollmentController.handle(req,res)
}))

enrollmentRoute.get('/students/:id/enrollment', resolveController(async (req: Request, res: Response) => {
    return await getByStudentEnrollmentController.handle(req,res)
}))

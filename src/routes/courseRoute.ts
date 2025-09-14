import { Request, Response, Router } from "express";
import { resolveController } from "../adapters/resolverController";
import { CourseRepository } from "../repositories/CourseRepository";
import { CreateCourseController } from "./controllers/course/CreateCourseController";
import { GetCourseController } from "./controllers/course/GetCourseController";
import { GetPageCourseController } from "./controllers/course/GetPageCourseController";
import { ListCourseController } from "./controllers/course/ListCourseController";

export const courseRoute = Router();

const courseRepo = new CourseRepository();
const createCourseController = new CreateCourseController(courseRepo)
const getCourseController = new GetCourseController(courseRepo)
const getPageCourseController = new GetPageCourseController(courseRepo)
const listCourseController = new ListCourseController(courseRepo)

courseRoute.post('/', resolveController(async (req: Request, res: Response) => {
    return await createCourseController.handle(req, res)
}))

courseRoute.get('/', resolveController(async (req: Request, res: Response) => {
    return await listCourseController.handle(req, res)
}))

courseRoute.get('/get/:idOrSlug', resolveController(async (req: Request, res: Response) => {
    return await getCourseController.handle(req, res)
}))

courseRoute.get('/paginated', resolveController(async (req: Request, res: Response) => {
  return await getPageCourseController.handle(req, res);
}));

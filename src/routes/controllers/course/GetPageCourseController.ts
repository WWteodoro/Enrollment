import { Request, Response } from "express";
import { ICourseRepository } from "../../../interfaces/ICourseRepository";
import { GetPageCourseService } from "../../../services/CourseService/GetPageCourseService";

export class GetPageCourseController {
  constructor(private courseRepo: ICourseRepository) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { q, page, perPage, minPrice, maxPrice } = req.query;

    const getPageCourseService = new GetPageCourseService(this.courseRepo);

    const result = await getPageCourseService.execute({
      q: q as string,
      page: page ? Number(page) : 1,
      perPage: perPage ? Number(perPage) : 10,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined
    });

    return res.json(result);
  }
}

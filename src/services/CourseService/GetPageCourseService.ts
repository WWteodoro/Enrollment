import { ICourseGetPageRequest, ICourse } from '../../interfaces/ICourseInterface';
import { ICourseRepository } from '../../interfaces/ICourseRepository';
import { Logger } from '../../utills/logger';
import { redis } from '../../utills/redis';

export class GetPageCourseService {
  constructor(private courseRepo: ICourseRepository) {}

  async execute({
    q,
    page = 1,
    perPage = 10,
    minPrice,
    maxPrice
  }: ICourseGetPageRequest): Promise<{
    data: ICourse[];
    total: number;
    page: number;
    perPage: number;
  }> {
    const cacheKey = `courses:${q || ''}:${page}:${perPage}:${minPrice || ''}:${maxPrice || ''}`;

    const cached = await redis.get(cacheKey);
    if (cached) {
      Logger.info(`Cache HIT: ${cacheKey}`);
      return JSON.parse(cached);
    }

    const result = await this.courseRepo.getByPage({
      q,
      page,
      perPage,
      minPrice,
      maxPrice
    });

    await redis.set(cacheKey, JSON.stringify(result), {
        EX: 60 
    });

    Logger.info(`Cache MISS: ${cacheKey}`);

    return result;
  }
}

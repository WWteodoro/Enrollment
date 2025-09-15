import { ICourse, ICourseGetPageRequest, ICourseGetRequest } from "./ICourseInterface";

export interface ICourseRepository{
    findAll(): Promise<ICourse[]>
    create(props: ICourse): Promise<ICourse>
    getByPage(props: ICourseGetPageRequest): Promise<{
    data: ICourse[];
    total: number;
    page: number;
    perPage: number;
  }>;
    get(props: ICourseGetRequest): Promise<ICourse>
}
export interface ICourse{
    id: string;
    title: string;
    slug: string;
    priceCents: string;
    capacity?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICourseCreateRequest{
    title: string;
    slug: string;
    priceCents: string;
    capacity?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICourseGetPageRequest {
  q?: string;
  page?: number;
  perPage?: number;
  minPrice?: number;
  maxPrice?: number; 
}


export interface ICourseGetRequest{
    id?: string;
    slug?: string;
}

import { ICourse } from "../interfaces/ICourseInterface";
import { createUUID } from "../utills/createUUID";

export class Course{
    id: ICourse['id'];
    title: ICourse['title'];
    slug: ICourse['slug'];
    priceCents: ICourse['priceCents'];
    capacity?: ICourse['capacity'];
    createdAt?: ICourse['createdAt'];
    updatedAt?: ICourse['updatedAt'];

    constructor(props: Omit<ICourse, 'id'>, id?:string){
        this.id = id || createUUID()
        this.title = props.title
        this.slug = props.slug
        this.priceCents = props.priceCents
        this.capacity = props.capacity
        this.createdAt = props.createdAt || new Date();
        this.updatedAt = new Date();
    }

    toJson(): ICourse{
        return{
            id: this.id,
            title: this.title,
            slug: this.slug,
            priceCents: this.priceCents,
            capacity: this.capacity,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt 
        }
    }
}
import { IUserGetRequest, IUser } from "../../interfaces/IUserInterface"
import { IUserRepository } from "../../interfaces/IUserRepository"


export class GetUserService{
    constructor(private userRepo: IUserRepository){}
    async execute({ id }: IUserGetRequest): Promise<IUser>{
        const result = await this.userRepo.findOneUser(id)
        return result
    }
}
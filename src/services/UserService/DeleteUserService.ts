import { IUserDeleteRequest } from "../../interfaces/IUserInterface"
import { IUserRepository } from "../../interfaces/IUserRepository"



export class DeleteUserService{
    constructor(private userRepo: IUserRepository){}

    async execute({ id }: IUserDeleteRequest): Promise<void>{
        await this.userRepo.findOneUser(id)
        await this.userRepo.delete(id)
    }
}
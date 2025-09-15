import { User } from "../../entities/user"
import { IUserUpdateRequest } from "../../interfaces/IUserInterface"
import { IUserRepository } from "../../interfaces/IUserRepository"

export class UpdateUserService{
    constructor(private userRepo: IUserRepository){}
    async execute({ id, name, email, password }: IUserUpdateRequest): Promise<void>{
        const result = await this.userRepo.findOneUser(id)
    
        const user = new User({
            name: name || result.name,
            email: email || result.email,
            password: password || result.password,
            
        }, result.id)
        
        await this.userRepo.update(user.toJson(), id)
    
    }
}
import { User } from "../../entities/user";
import { IHashRepository } from "../../interfaces/IHashRepository";
import { IUserCreateRequest, IUser } from "../../interfaces/IUserInterface";
import { IUserRepository } from "../../interfaces/IUserRepository";


export class CreateUserService{
    constructor(private userRepo: IUserRepository, private hashRepo: IHashRepository){}
    async execute({ email, password, name}: IUserCreateRequest): Promise<IUser>{
        
        password = await this.hashRepo.cryptographie(password);
        
        const user = new User({email , password, name})
        
        const result = await this.userRepo.insert(user.toJson())

        return result
               
    }
}
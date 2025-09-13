import { AppError } from "../../errors/AppError";
import { IUserGetByEmailRequest, IUser } from "../../interfaces/IUserInterface";
import { IUserRepository } from "../../interfaces/IUserRepository";

export class GetUserByEmailService{
    constructor(private userRepo: IUserRepository){}
    async execute({email}: IUserGetByEmailRequest): Promise<IUser>{
        const result = await this.userRepo.findUserByEmail(email)
        if(!result) throw new AppError("User not found");
        return result;
    }
}
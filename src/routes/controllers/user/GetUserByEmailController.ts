import { Request, Response} from "express";
import { IUserRepository } from "../../../interfaces/IUserRepository";
import { GetUserByEmailService } from "../../../services/UserService/GetUserByEmailService";


export class GetUserByEmailController{
    constructor(private userRepo: IUserRepository){}
    async handle(req: Request, res: Response):Promise<Response>{
        const { email } = req.params;

        const getUserByEmailService = new GetUserByEmailService(this.userRepo)
        const result = await getUserByEmailService.execute({ email })

        return res.status(200).json(result)
    }
}
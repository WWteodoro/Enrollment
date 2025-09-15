import { Request, Response } from "express";
import { GetUserService } from "../../../services/UserService/GetUserService";
import { IUserRepository } from "../../../interfaces/IUserRepository";


export class GetUserController {
    constructor(private userRepo: IUserRepository){}
    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

    const getUserService = new GetUserService(this.userRepo)
        const result = await getUserService.execute({ id })
    return res.json(result)
    }
}
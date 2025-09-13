import { Request, Response } from "express";
import { ListUsersService } from "../../../services/UserService/ListUserService";
import { IUserRepository } from "../../../interfaces/IUserRepository";


export class ListUsersController {
    constructor(private userRepo: IUserRepository){}
    async handle(_: Request, res: Response): Promise<Response> {
     const listUsersService = new ListUsersService(this.userRepo)
     const users = await listUsersService.execute()
     return res.json(users)
    }
}


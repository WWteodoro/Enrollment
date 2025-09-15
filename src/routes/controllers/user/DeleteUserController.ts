import { Request, Response } from "express";
import { DeleteUserService } from "../../../services/UserService/DeleteUserService";
import { IUserRepository } from "../../../interfaces/IUserRepository";


export class DeleteUserController {
    constructor(private userRepo: IUserRepository){}
    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const deleteUserService = new DeleteUserService(this.userRepo)
        await deleteUserService.execute({ id })

    return res.status(200).send()
    }
}


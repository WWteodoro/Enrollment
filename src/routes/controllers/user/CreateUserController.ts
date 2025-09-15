import { Request, Response } from "express";
import { CreateUserService } from "../../../services/UserService/CreateUserService";
import { IHashRepository } from "../../../interfaces/IHashRepository";
import { IUserRepository } from "../../../interfaces/IUserRepository";


export class CreateUserController {
    constructor(private userRepo: IUserRepository, private hashRepo: IHashRepository){}
    async handle(req: Request, res: Response): Promise<Response> {
        const { name, password, email
        } = req.body;

    const createUserService = new CreateUserService(this.userRepo, this.hashRepo)
    const result = await createUserService.execute({ name, email, password})
    
        return res.status(201).json(result);
    }}


import { IHashRepository } from "../../../interfaces/IHashRepository";
import { IJWTRepository } from "../../../interfaces/IJWTRepository";
import { IUserRepository } from "../../../interfaces/IUserRepository";
import { AuthenticateUserService } from "../../../services/UserService/AuthenticateUserService";
import { Request, Response } from "express";

export class AuthenticateUserController {
    constructor(
        private userRepo: IUserRepository, 
        private jwtRepo: IJWTRepository,
        private hashRepo: IHashRepository
    ) { };

    async handle(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        const authenticateUserService = new AuthenticateUserService(this.userRepo, this.jwtRepo, this.hashRepo);
        const result = await authenticateUserService.execute({email, password});

        return res.status(201).json(result)
    }
}
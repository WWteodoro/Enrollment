import { Router, Request, Response } from "express";
import { resolveController } from "../adapters/resolverController";
import { HashRepository } from "../repositories/HashRepository";
import { UserRepository } from "../repositories/UserRepository";
import { AuthenticateUserController } from "./controllers/user/AuthenticateUserController";
import { CryptoRepository } from "../repositories/CryptoRepository";
import { JWTRepository } from "../repositories/JWTRepository";
import { ICryptoRepository } from "../interfaces/ICryptoRepository";
import { IHashRepository } from "../interfaces/IHashRepository";
import { IJWTRepository } from "../interfaces/IJWTRepository";
import { IUserRepository } from "../interfaces/IUserRepository";

export const userAuthenticateRoute = Router();

const cryptoRepo: ICryptoRepository = new CryptoRepository()
const userRepo: IUserRepository = new UserRepository();
const jwtRepo: IJWTRepository = new JWTRepository();
const hashRepo: IHashRepository = new HashRepository();
const authenticateUserController = new AuthenticateUserController(userRepo, jwtRepo, hashRepo);

userAuthenticateRoute.post("/login", resolveController(async (req: Request, res: Response) => {
    return await authenticateUserController.handle(req, res);
}))
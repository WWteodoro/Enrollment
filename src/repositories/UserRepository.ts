import { AppError } from "../errors/AppError";
import { IUser } from "../interfaces/IUserInterface";
import { IUserRepository } from "../interfaces/IUserRepository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class UserRepository implements IUserRepository{
    constructor() {}
    async findAll(): Promise<IUser[]> {
        const result = await prisma.user.findMany()
        return result
    }

    async insert(props: IUser): Promise<IUser> {
        const result = await prisma.user.create({
            data: {id: props.id,name: props.name, email: props.email, password: props.password, role: props.role || "student"}
        })
        
        return result;

    }

    async findOneUser(id: string): Promise<IUser>{
        const result = await prisma.user.findUnique({
            where: { id }
        })

        if(!result) throw new AppError('User not found')
        return result
    }

    async update(props: IUser, id: string): Promise<IUser> {
        const result = await prisma.user.update({
            where: { id },
            data: {id: props.id,name: props.name, email: props.email, password: props.password, role: props.role},
        })

        return result;
    };

    async delete(id: string): Promise<void>{
        await prisma.user.delete({
            where: { id }
        })
    }

    async findUserByEmail(email: string): Promise<IUser> {
        const result = await prisma.user.findUnique({
          where: { email }
        });
        if(!result) throw new Error('User not found')
        
        return result;
      }
}
export interface IUser{
    id: string;
    name: string;
    email: string;
    password: string;    
    createdAt?: Date;
    updatedAt?: Date;
    role?: string;
}

export interface IUserCreateRequest{
    name: string;
    email: string;
    password: string;    
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserGetRequest {
    id: string;
}

export interface IUserGetByEmailRequest {
    email: string;
}

export interface IUserUpdateRequest{
    id: string;
    name: string;
    email: string;
    password: string;
    confirmEmail?: string;
    confirmPassword?: string;
}

export interface IUserDeleteRequest{
    id: string;
}

export interface IUserAuthenticateRequest {
    email    : string;
    password : string;
}
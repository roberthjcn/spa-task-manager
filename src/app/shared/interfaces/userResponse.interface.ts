import { IUser } from "./user.interface";

export interface IUserResponse {
    status: number;
    user: IUser;
}
import { Model } from "sequelize";

export interface IUser extends Model {
    id: number;
    fullName: string;
    email: string;
    password: string;
  }
  
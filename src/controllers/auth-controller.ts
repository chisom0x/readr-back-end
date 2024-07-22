import { Request, Response } from 'express';
import userService from '../services/user-service';
import createSendToken from '../utils/jwt-helper';
import bcrypt from 'bcryptjs';
import type { IUser } from '../types/user.d.ts';

export class authController {
  static async signUp(req: Request, res: Response) {
    try {
      const { fullName, email, password } = req.body;
      const userExists = await userService.emailExists(email);
      if (userExists)
        return res
          .status(400)
          .json({ status: false, message: 'email already in use!', data: [] });
      const createdUser = await userService.createUser(
        fullName,
        email,
        password
      );
      return createSendToken(createdUser, 200, res);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ status: false, message: 'something went wrong!', data: [] });
    }
  }
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = (await userService.emailExists(
        email
      )) as unknown as IUser | null;
      let userPass = !user ? 'no_user' : user.password;
      //@ts-ignore
      const pass = bcrypt.compare(password, userPass);
      if (user && pass) return createSendToken(user, 200, res);
      return res
        .status(400)
        .json({
          status: false,
          message: 'incorrect email or password!',
          data: [],
        });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ status: false, message: 'something went wrong!', data: [] });
    }
  }
}

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export default class LoggedInUser {
  static async getLoggedInUser(req: Request, res: Response) {
    try {
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1];
      } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
      }

      if (!token) {
        return 'not-logged-in';
      }

      //@ts-ignore
      const decoded = await promisify(jwt.verify)(
        token,
        //@ts-ignore
        process.env.JWT_SECRET
      );
      //@ts-ignore
      const userId = decoded.id;
      return userId;
    } catch (err) {
      throw err;
    }
  }
}

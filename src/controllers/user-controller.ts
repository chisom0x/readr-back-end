import { Request, Response } from 'express';
import userService from '../services/user-service';

export default class userController {
  static async getUser(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      if (!userId)
        return res
          .status(400)
          .json({ status: false, message: 'provide a userId!', data: null });
      const user = await userService.getUserById(userId);
      if (user)
        return res
          .status(200)
          .json({ status: true, message: 'successful!', data: user });
      return res
        .status(400)
        .json({ status: false, message: 'user not found!', data: {} });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ status: false, message: 'something went wrong!', data: null });
    }
  }

  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getUsers();
      if (users)
        return res
          .status(200)
          .json({ status: true, message: 'successful!', data: users });
      return res
        .status(200)
        .json({ status: true, message: 'successful!', data: null });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ status: false, message: 'something went wrong!', data: null });
    }
  }

  static async updateUserInformation(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const { fullName, email } = req.body;
      const updatedUser = await userService.updateUserById(
        userId,
        fullName,
        email
      );
      if (updatedUser === null)
        return res
          .status(404)
          .json({ status: false, message: 'user not found!', data: null });
      if (updatedUser)
        return res.status(200).json({
          status: true,
          message: 'user updated successfully',
          data: updatedUser,
        });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ status: false, message: 'something went wrong!', data: null });
    }
  }

  static async changePassword(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const { password } = req.body;
      const updatedUser = await userService.getUserById(userId);
      if (updatedUser === null) {
        return res
          .status(404)
          .json({ status: false, message: 'User not found!', data: null });
      }
      updatedUser.password = password;
      await updatedUser.save();
      return res.status(200).json({
        status: true,
        message: 'Password updated successfully',
        data: updatedUser,
      });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ status: false, message: 'Something went wrong!', data: null });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const deletedUser = await userService.deleteUserById(userId);
      if (deletedUser === null)
        return res
          .status(404)
          .json({ status: false, message: 'user not found!', data: null });
      return res
        .status(200)
        .json({ status: true, message: 'deletion successful', data: null });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ status: false, message: 'something went wrong!', data: null });
    }
  }
}

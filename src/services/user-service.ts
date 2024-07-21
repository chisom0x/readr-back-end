import { IUser } from 'types/user.js';
import User from '../models/user-model.ts';
import bcrypt from 'bcryptjs';

export default class userService {
  static async createUser(fullName: string, email: string, password: string) {
    try {
      const newUser = await User.create({
        fullName: fullName,
        email: email,
        password: password,
      });
      return newUser;
    } catch (err) {
      throw err;
    }
  }

  static async emailExists(email: string) {
    try {
      const user = await User.findOne({ email: email });
      return user;
    } catch (err) {
      throw err;
    }
  }

  static async checkPassword(password: string, hashPassword: string) {
    try {
      const user = await bcrypt.compare(password, hashPassword);
      return user;
    } catch (err) {
      throw err;
    }
  }

  static async getUserById(userId: any) {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (err) {
      throw err;
    }
  }

  static async getUsers() {
    try {
      const user = await User.find();
      return user;
    } catch (err) {
      throw err;
    }
  }

  static async deleteUserById(userId: any) {
    try {
      const result = await User.findByIdAndDelete(userId);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async updateUserById(userId: any, name: string, email: string) {
    try {
      const user = await User.findByIdAndUpdate(userId, {
        fullName: name,
        email: email,
      }, {new: true});
      return user;
    } catch (err) {
      throw err;
    }
  }
}

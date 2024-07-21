import request from 'supertest';
import { createServer } from '../../src/app.ts';
import userService from '../../src/services/user-service.ts';
import { IUser } from '../../src/types/user';
import { response } from 'express';

jest.mock('../../src/services/user-service.ts', () => ({
  getUserById: jest.fn(),
  getUsers: jest.fn(),
  deleteUserById: jest.fn(),
  updateUserById: jest.fn(),
  changePassword: jest.fn(),
}));

const mockedUserService = userService as jest.Mocked<typeof userService>;

describe('user account tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('get user by id', () => {
    it('should return 404 if user is not found', async () => {
      //@ts-ignore
      mockedUserService.getUserById.mockResolvedValue(null);

      const res = await request(createServer()).post('/readr/users/1');

      expect(res.status).toBe(404);
    });
    it('should return the user found', async () => {
      const userId = 1;
      const mockUser = {
        id: 1,
        fullName: 'John Doe',
        email: 'johndoe@mail.com',
      };

      mockedUserService.getUserById.mockResolvedValueOnce(
        //@ts-ignore
        (receivedId: number) => {
          if (receivedId === userId) {
            return mockUser;
          } else {
            return null;
          }
        }
      );
      const res = await request(createServer()).get(`/readr/users/${userId}`);

      expect(res.status).toBe(200);
    });
    it('should return 500 if there is any unhandled error caught', async () => {
      const userId = 1;
      mockedUserService.getUserById.mockRejectedValue(
        new Error('Database error')
      );
      const res = await request(createServer()).get(`/readr/users/${userId}`);

      expect(res.status).toBe(500);
    });
  });

  describe('get all users', () => {
    it('should return 200 if users are found', async () => {
      const mockUser = {
        id: 1,
        fullName: 'John Doe',
        email: 'johndoe@mail.com',
      };
      //@ts-ignore
      mockedUserService.getUsers.mockResolvedValueOnce(mockUser);
      const res = await request(createServer()).get('/readr/users');

      expect(res.status).toBe(200);
    });
    it('should return 500 if there is an error caught in the catch block', async () => {
      mockedUserService.getUsers.mockRejectedValue(new Error('Database Error'));
      const res = await request(createServer()).get('/readr/users');

      expect(res.status).toBe(500);
    });
  });

  describe('delete a user', () => {
    it('should return 200 if user is deleted successfully', async () => {
      const userId = 1;

      mockedUserService.deleteUserById.mockResolvedValueOnce(
        //@ts-ignore
        (receivedId: number) => {
          if (receivedId === userId) {
            return 1;
          } else {
            return 0;
          }
        }
      );

      const res = await request(createServer()).delete(
        `/readr/users/${userId}`
      );

      expect(res.status).toBe(200);
    });
    it('should return 404 if user is not found', async () => {
      mockedUserService.deleteUserById.mockResolvedValue(0);
      const res = await request(createServer()).delete(`/readr/users/1`);
      expect(res.status).toBe(404);
    });
    it('should return 500 if any error is caught in the catch block', async () => {
      mockedUserService.deleteUserById.mockRejectedValueOnce(
        new Error('Database Error')
      );
      const res = await request(createServer()).delete(`/readr/users/1`);
      expect(res.status).toBe(500);
    });
  });

  describe('update a user information', () => {
    const userId = 1;
    const fullName = 'New Name';
    const email = 'newemail@example.com';
    const updatedUser = {
      id: userId,
      fullName: fullName,
      email: email,
      password: 'uuiyyn',
    };
    it('should return 200 if user is updated successfully', async () => {
      const userId = 1;
      const fullName = 'New Name';
      const email = 'newemail@example.com';

      const updatedUser = {
        id: userId,
        fullName: fullName,
        email: email,
      };
      //@ts-ignore
      jest.spyOn(userService, 'updateUserById').mockResolvedValue(updatedUser);

      const res = await request(createServer())
        .patch(`/readr/users/${userId}`)
        .send({ fullName, email });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        status: true,
        message: 'user updated successfully',
        data: updatedUser,
      });
      expect(userService.updateUserById).toHaveBeenCalledWith(
        userId,
        fullName,
        email
      );
    });
    it('should return 404 if user is not found', async () => {
      const userId = 1;
      const fullName = 'New Name';
      const email = 'newemail@example.com';

      jest.spyOn(userService, 'updateUserById').mockResolvedValue(null);

      const res = await request(createServer())
        .patch(`/readr/users/${userId}`)
        .send({ fullName, email });

      expect(res.status).toBe(404);
      expect(res.body).toEqual({
        status: false,
        message: 'user not found!',
        data: null,
      });
      expect(userService.updateUserById).toHaveBeenCalledWith(
        userId,
        fullName,
        email
      );
    });
    it('should return 500 if an error occurs', async () => {
      const userId = 1;
      const fullName = 'New Name';
      const email = 'newemail@example.com';

      jest
        .spyOn(userService, 'updateUserById')
        .mockRejectedValue(new Error('Database Error'));

      const res = await request(createServer())
        .patch(`/readr/users/${userId}`)
        .send({ fullName, email });

      expect(res.status).toBe(500);
      expect(res.body).toEqual({
        status: false,
        message: 'something went wrong!',
        data: null,
      });
      expect(userService.updateUserById).toHaveBeenCalledWith(
        userId,
        fullName,
        email
      );
    });
  });

  describe('update user password', () => {
    const userId = 1;
    const password = 'new_password';
    const updatedPassword = {
      id: userId,
      password: password,
    };
    it('should return 200 if user password is changed successfully', async () => {
      jest
        .spyOn(userService, 'changePassword')
        //@ts-ignore
        .mockResolvedValueOnce(updatedPassword);
      const res = await request(createServer())
        .patch(`/readr/users/change-password/${userId}`)
        .send({ password });

      expect(res.status).toBe(200);
      expect(userService.changePassword).toHaveBeenCalledWith(userId, password);
    });
    it('should return 404 if user is not found', async () => {
      //@ts-ignore
      jest.spyOn(userService, 'changePassword').mockResolvedValue(null);
      const res = await request(createServer())
        .patch(`/readr/users/change-password/${userId}`)
        .send({ password });

      expect(res.status).toBe(404);
    });
    it('should return 500 if an error is caught by the catch block', async () => {
      jest
        .spyOn(userService, 'changePassword')
        .mockRejectedValue(new Error('Database Error'));

      const res = await request(createServer())
        .patch(`/readr/users/${userId}`)
        .send({ password });

      expect(res.status).toBe(500);
    });
  });
});

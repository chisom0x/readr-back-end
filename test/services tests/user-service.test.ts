import userService from '../../src/services/user-service.ts';
import User from '../../src/models/user-model.ts';
import { IUser } from '../../src/types/user.ts';
import bcrypt from 'bcryptjs';

jest.mock('../../src/models/user-model.js');

beforeAll(async () => {
  // Mock database connection setup if needed
});

afterEach(() => {
  jest.clearAllMocks(); // Clear all mocks after each test
});

afterAll(async () => {
  // Mock database connection teardown if needed
});

describe('UserService', () => {
  describe('create user', () => {
    it('should create a new user', async () => {
      const userData = {
        fullName: 'John Doe',
        email: 'johndoe@mail.com',
        password: '12345',
      };

      const hashedPassword = await bcrypt.hash(userData.password, 8);
      (User.create as jest.Mock).mockResolvedValue({
        ...userData,
        password: hashedPassword,
      });

      const newUser = (await userService.createUser(
        userData.fullName,
        userData.email,
        userData.password
      )) as unknown as IUser;

      expect(newUser).toBeDefined();
      expect(newUser.fullName).toBe(userData.fullName);
      expect(newUser.email).toBe(userData.email);

      (User.findOne as jest.Mock).mockResolvedValue({
        ...userData,
        password: hashedPassword,
      });

      const savedUser = (await User.findOne({
        where: { email: userData.email },
      })) as unknown as IUser;
      expect(savedUser).toBeDefined();
      const isPasswordMatch = await bcrypt.compare(
        userData.password,
        savedUser.password
      );
      expect(isPasswordMatch).toBe(true);
    });

    it('should throw an error when User.create fails', async () => {
      const userData = {
        fullName: 'John Doe',
        email: 'johndoe@mail.com',
        password: '12345',
      };

      (User.create as jest.Mock).mockImplementation(() => {
        throw new Error('Database error');
      });

      await expect(
        userService.createUser(
          userData.fullName,
          userData.email,
          userData.password
        )
      ).rejects.toThrow('Database error');
    });
  });

  describe('check if email exists', () => {
    it('should check if email exists', async () => {
      const userData = {
        fullName: 'John Doe',
        email: 'johndoe@mail.com',
        password: '12345',
      };

      (User.findOne as jest.Mock).mockResolvedValue(userData);

      const savedUser = (await userService.emailExists(
        userData.email
      )) as unknown as IUser | null;
      expect(savedUser).toBeDefined();
    });

    it('should return null if email does not exist', async () => {
      const nonExistentEmail = 'nonexistent@mail.com';

      (User.findOne as jest.Mock).mockResolvedValue(null);

      const savedUser = await userService.emailExists(nonExistentEmail);
      expect(savedUser).toBeNull();
    });

    it('should throw an error when check email exists fails', async () => {
      const userData = {
        email: 'johndoe@mail.com',
      };

      (User.findOne as jest.Mock).mockImplementation(() => {
        throw new Error('Database error');
      });

      await expect(userService.emailExists(userData.email)).rejects.toThrow(
        'Database error'
      );
    });
  });

  describe('delete user', () => {
    it('should delete a user and return the result', async () => {
      const userId = 1;

      (User.findByIdAndDelete as jest.Mock).mockResolvedValue(1);

      const result = await userService.deleteUserById(userId);
      expect(User.findByIdAndDelete).toHaveBeenCalledWith(userId);
      expect(result).toBe(1);
    });

    it('should return null if the user is not found', async () => {
      const userId = 1;

      (User.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      const result = await userService.deleteUserById(userId);
      expect(User.findByIdAndDelete).toHaveBeenCalledWith(userId);
      expect(result).toBeNull();
    });

    it('should throw an error if deletion fails', async () => {
      const userId = 1;

      (User.findByIdAndDelete as jest.Mock).mockRejectedValueOnce(
        new Error('Deletion failed')
      );

      await expect(userService.deleteUserById(userId)).rejects.toThrow(
        'Deletion failed'
      );
      expect(User.findByIdAndDelete).toHaveBeenCalledWith(userId);
    });
  });

  describe('update user by id', () => {
    const mockedUser = {
      id: 1,
      fullName: 'Old Name',
      email: 'oldemail@example.com',
      save: jest.fn().mockResolvedValue(undefined),
    } as any;

    it('should update the username and email if user exists', async () => {
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockedUser);

      const userId = 1;
      const newName = 'New Name';
      const newEmail = 'newemail@example.com';

      const result = await userService.updateUserById(
        userId,
        newName,
        newEmail
      );

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(userId);
      expect(mockedUser.save).toHaveBeenCalled();
    });

    it('should return null if user does not exist', async () => {
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      const userId = 1;
      const newName = 'New Name';
      const newEmail = 'newemail@example.com';

      const result = await userService.updateUserById(
        userId,
        newName,
        newEmail
      );

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(userId);
      expect(result).toBeNull();
    });

    it('should throw an error if save fails', async () => {
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockedUser);
      mockedUser.save.mockRejectedValue(new Error('Save failed'));

      const userId = 1;
      const newName = 'New Name';
      const newEmail = 'newemail@example.com';

      await expect(
        userService.updateUserById(userId, newName, newEmail)
      ).rejects.toThrow('Save failed');
      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(userId);
      expect(mockedUser.save).toHaveBeenCalled();
    });
  });
});

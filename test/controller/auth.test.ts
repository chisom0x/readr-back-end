import request from 'supertest'
import { createServer } from "../../src/app.ts";
import  userService  from '../../src/services/user-service.ts';
import { IUser } from '../../src/types/user';

jest.mock('../../src/services/user-service.ts', ()=>({
    emailExists: jest.fn(),
    createUser: jest.fn(),
    checkPassword: jest.fn()
}))

const mockedUserService = userService as jest.Mocked<typeof userService>

describe('authentication tests', () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
      });
    describe('signup', ()=>{
        it('should return 400 if email is already in use', async ()=>{
            //@ts-ignore
            mockedUserService.emailExists.mockResolvedValue(true)
            const response = await request(createServer())
            .post("/readr/auth/signup")
            .send({ fullName: 'John Doe', email: 'johndoe@mail.com', password: '12345' })
    
            expect(response.status).toBe(400)
            expect(response.body.message).toBe('email already in use!');
        })
        it('should create a new user and return token in the response body', async ()=>{
            //@ts-ignore
           mockedUserService.emailExists.mockResolvedValue(false)
           mockedUserService.createUser.mockResolvedValue({
            id: 1,
            fullName: 'John Doe',
            email: 'johndoe@mail.com',
            password: 'hashed_password',
           } as IUser)

           const response = await request(createServer())
        .post('/readr/auth/signup')
        .send({ fullName: 'John Doe', email: 'johndoe@mail.com', password: '12345' });

      expect(response.status).toBe(200); // Ensure the status is 200
      expect(response.body.message).toBe('successful');
      expect(response.body).toHaveProperty('token');
        })
        it('should return 500 if any error occurs', async ()=>{
            mockedUserService.emailExists.mockRejectedValue(new Error('Database Error'))
            const response = await request(createServer())
            .post('/readr/auth/signup')
            .send({ fullName: 'John Doe', email: 'johndoe@mail.com', password: '12345' });
    
          expect(response.status).toBe(500);
          expect(response.body.message).toBe('something went wrong!');
        })
    })
    describe('login', ()=>{
        it('should return 400 if password is incorrect', async()=>{
            //@ts-ignore
            mockedUserService.emailExists.mockResolvedValue(true)
            mockedUserService.checkPassword.mockResolvedValue(false)

            const response = await request(createServer())
            .post('/readr/auth/login')
            .send({ email: 'johndoe@mail.com', password: '12345' });
    
          expect(response.status).toBe(400);
        })
        it('should return 400 if email is incorrect', async()=>{
            //@ts-ignore
            mockedUserService.emailExists.mockResolvedValue(false)
            mockedUserService.checkPassword.mockResolvedValue(true)

            const response = await request(createServer())
            .post('/readr/auth/login')
            .send({ email: 'johndoe@mail.com', password: '12345' });
    
          expect(response.status).toBe(400);
        })
        it('should log a user in if email and password is correct', async()=>{
            const mockUser = {
                id: 1,
                fullName: 'John Doe',
                email: 'johndoe@mail.com',
                password: 'hashed_password', // this should be the hashed password stored in DB
              };
            //@ts-ignore
            mockedUserService.emailExists.mockResolvedValue(mockUser)
            mockedUserService.checkPassword.mockResolvedValue(true)

            const response = await request(createServer())
            .post('/readr/auth/login')
            .send({ email: 'johndoe@mail.com', password: '12345' });
    
          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty('token')
          expect(response.body.message).toBe('successful')
        })
    })
})


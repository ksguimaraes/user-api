import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NotFound } from '../_errors/notFound';
import { AuthService } from './authService';
import { UserService } from './userService';

jest.mock('jsonwebtoken');
jest.mock('bcrypt');

describe('AuthService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('loginUser', () => {
        it('should login user with valid credentials', async () => {
            const userService = new UserService();
            const authService = new AuthService();

            const mockUser = {
                id: '123',
                cpf: '00000000001',
                password: 'hashedPassword',
            };

            const mockToken = 'mockToken';
            const mockCpf = '00000000001';
            const mockPassword = 'password';

            userService.findUserByCpf = jest.fn().mockResolvedValue(mockUser);

            (compare as jest.Mock).mockResolvedValue(true);

            (authService.generateToken as jest.Mock).mockResolvedValue(mockToken);

            const result = await authService.loginUser(mockCpf, mockPassword);

            expect(userService.findUserByCpf).toHaveBeenCalledWith(mockCpf);
            expect(compare).toHaveBeenCalledWith(mockPassword, mockUser.password);
            expect(authService.generateToken).toHaveBeenCalledWith(mockUser.id);
            expect(result).toBe(mockToken);
        });

        it('should throw NotFound error if user is not found', async () => {
            const userService = new UserService();
            const authService = new AuthService();
            const mockCpf = '00000000001';
            const mockPassword = 'password';

            userService.findUserByCpf = jest.fn().mockResolvedValue(null);

            await expect(authService.loginUser(mockCpf, mockPassword)).rejects.toThrow(NotFound);
        });

        it('should throw error if password is invalid', async () => {
            const userService = new UserService();
            const authService = new AuthService();
            const mockUser = {
                id: '123',
                cpf: '00000000001',
                password: 'hashedPassword',
            };
            const mockCpf = '00000000001';
            const mockPassword = 'password';

            userService.findUserByCpf = jest.fn().mockResolvedValue(mockUser);

            (compare as jest.Mock).mockResolvedValue(false);

            await expect(authService.loginUser(mockCpf, mockPassword)).rejects.toThrow(Error);
        });
    });

    describe('generateToken', () => {
        it('should generate a token', async () => {
            const authService = new AuthService();
            const mockUserId = '123';
            const mockToken = 'mockToken';

            (jwt.sign as jest.Mock).mockReturnValue(mockToken);

            const result = await authService.generateToken(mockUserId);

            expect(jwt.sign).toHaveBeenCalledWith({ userId: mockUserId }, expect.any(String), { expiresIn: expect.any(String) });
            expect(result).toBe(mockToken);
        });
    });

    describe('verifyToken', () => {
        it('should verify and decode a valid token', async () => {
            const authService = new AuthService();
            const mockToken = 'mockToken';
            const mockDecoded = { userId: '123' };

            (jwt.verify as jest.Mock).mockReturnValue(mockDecoded);

            const result = await authService.verifyToken(mockToken);

            expect(jwt.verify).toHaveBeenCalledWith(mockToken, expect.any(String));
            expect(result).toEqual(mockDecoded);
        });

        it('should throw error for invalid token', async () => {
            const authService = new AuthService();
            const mockToken = 'invalidToken';

            (jwt.verify as jest.Mock).mockImplementation(() => {
                throw new Error();
            });

            await expect(authService.verifyToken(mockToken)).rejects.toThrow(Error);
        });
    });
});

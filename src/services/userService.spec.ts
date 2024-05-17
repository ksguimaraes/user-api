import { UserService } from './userService';
import { UserRepository } from '../repositories/userRepository';
import { BadRequest } from '../_errors/badRequest';
import { UserCreateRequestDto } from '../dtos/userCreateRequestDto';
import { NotFound } from '../_errors/notFound';

jest.mock('../repositories/userRepository');

describe('UserService', () => {
    let userService: UserService;
    beforeEach(() => {
        jest.clearAllMocks();
        userService = new UserService();
    });

    describe("Create user", () => {
        it("should create a new user", async () => {
            const userData: UserCreateRequestDto = {
                cpf: "00000000001",
                password: "123456",
                name: "Test User",
                birthDate: new Date("1990-01-01"),
                address: {
                    street: "Rua teste",
                    number: 123,
                    complement: "A",
                    neighborhood: "Teste",
                    city: "Teste",
                    state: "Teste",
                    zipCode: "00000-000"
                }
            };

            const userId = 'abc123';
            const userResult = {
                id: userId,
                cpf: "00000000001",
                password: "123456",
                name: "Test User",
                birthDate: new Date(),
                address: {
                    street: "Rua teste",
                    number: 123,
                    complement: "A",
                    neighborhood: "Teste",
                    city: "Teste",
                    state: "Teste",
                    zipCode: "00000-000"
                },
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
                createdByUserId: null,
                updatedByUserId: null,
                deletedByUserId: null
            };
            
            UserService.prototype.findUserByCpf = jest.fn().mockResolvedValue(null);
            UserRepository.prototype.createUser = jest.fn().mockResolvedValue({ userResult });

            const user = await userService.createUser(userData);

            expect(UserService.prototype.findUserByCpf).toHaveBeenCalledWith(userData.cpf);
            expect(UserRepository.prototype.createUser).toHaveBeenCalledWith(userData, undefined);
            expect(user).toEqual({ userResult });
        });

        it("should throw BadRequest error when user already exists", async () => {
            const userData: UserCreateRequestDto = {
                cpf: "00000000001",
                password: "123456",
                name: "Test User",
                birthDate: new Date("1990-01-01"),
                address: {
                    street: "Rua teste",
                    number: 123,
                    complement: "A",
                    neighborhood: "Teste",
                    city: "Teste",
                    state: "Teste",
                    zipCode: "00000-000"
                }
            };
            
            UserService.prototype.findUserByCpf = jest.fn().mockResolvedValue({});
            await expect(userService.createUser(userData)).rejects.toThrow(BadRequest);
        });
    });

    describe("Get user by id", () => {
        it("should get user by id", async () => {
            const userId = 'abc123';
            const user = {
                id: userId,
                cpf: "00000000001",
                password: "123456",
                name: "Test User",
                birthDate: new Date("1990-01-01"),
                address: {
                    street: "Rua teste",
                    number: 123,
                    complement: "A",
                    neighborhood: "Teste",
                    city: "Teste",
                    state: "Teste",
                    zipCode: "00000-000"
                },
                createdAt: "2024-05-15T19:14:50.891Z",
                updatedAt: "2024-05-16T21:14:02.950Z",
                deletedAt: null,
                createdByUserId: null,
                updatedByUserId: null,
                deletedByUserId: null
            };
            
            UserRepository.prototype.findUserById = jest.fn().mockResolvedValue(user);

            const result = await userService.getUserById(userId);

            expect(UserRepository.prototype.findUserById).toHaveBeenCalledWith(userId);
            expect(result).toEqual(user);
        });

        it("should throw NotFound error when user does not exist", async () => {
            const userId = 'abc123';
            
            UserRepository.prototype.findUserById = jest.fn().mockResolvedValue(null);
            await expect(userService.getUserById(userId)).rejects.toThrow(NotFound);
        });
    });

    describe("Update user", () => {
        it("should update user", async () => {
            const userId = 'abc123';
            const userData = {
                name: "Test User",
                birthDate: new Date("1990-01-01"),
                address: {
                    street: "Rua teste",
                    number: 123,
                    complement: "A",
                    neighborhood: "Teste",
                    city: "Teste",
                    state: "Teste",
                    zipCode: "00000-000"
                }
            };
            const updatedUser = {
                id: userId,
                cpf: "00000000001",
                password: "123456",
                ...userData,
                createdAt: "2024-05-15T19:14:50.891Z",
                updatedAt: "2024-05-16T21:14:02.950Z",
                deletedAt: null,
                createdByUserId: null,
                updatedByUserId: null,
                deletedByUserId: null
            };
            
            UserRepository.prototype.findUserById = jest.fn().mockResolvedValue(updatedUser);
            UserRepository.prototype.updateUser = jest.fn().mockResolvedValue(updatedUser);

            const result = await userService.updateUser(userId, userData);

            expect(UserRepository.prototype.findUserById).toHaveBeenCalledWith(userId);
            expect(UserRepository.prototype.updateUser).toHaveBeenCalledWith(userId, userData);
            expect(result).toEqual(updatedUser);
        });

        it("should throw NotFound error when user does not exist", async () => {
            const userId = 'abc123';
            const userData = {
                name: "Test User",
                birthDate: new Date("1990-01-01"),
                address: {
                    street: "Rua teste",
                    number: 123,
                    complement: "A",
                    neighborhood: "Teste",
                    city: "Teste",
                    state: "Teste",
                    zipCode: "00000-000"
                }
            };
            
            UserRepository.prototype.findUserById = jest.fn().mockResolvedValue(null);
            await expect(userService.updateUser(userId, userData)).rejects.toThrow(NotFound);
        });
    });
    describe("Delete user", () => {
        it("should delete user", async () => {
            const userId = 'abc123';
            const user = {
                id: userId,
                cpf: "00000000001",
                password: "123456",
                name: "Test User",
                birthDate: new Date("1990-01-01"),
                address: {
                    street: "Rua teste",
                    number: 123,
                    complement: "A",
                    neighborhood: "Teste",
                    city: "Teste",
                    state: "Teste",
                    zipCode: "00000-000"
                },
                createdAt: "2024-05-15T19:14:50.891Z",
                updatedAt: "2024-05-16T21:14:02.950Z",
                deletedAt: null,
                createdByUserId: null,
                updatedByUserId: null,
                deletedByUserId: null
            };
            
            UserRepository.prototype.findUserById = jest.fn().mockResolvedValue(user);
            UserRepository.prototype.deleteUser = jest.fn();

            await userService.deleteUser(userId);

            expect(UserRepository.prototype.findUserById).toHaveBeenCalledWith(userId);
            expect(UserRepository.prototype.deleteUser).toHaveBeenCalledWith(userId);
        });

        it("should throw NotFound error when user does not exist", async () => {
            const userId = 'abc123';
            
            UserRepository.prototype.findUserById = jest.fn().mockResolvedValue(null);
            await expect(userService.deleteUser(userId)).rejects.toThrow(NotFound);
        });
    });

    describe("Find user by cpf", () => {
        it("should find user by cpf", async () => {
            const cpf = '00000000001';
            const user = {
                id: 'abc123',
                cpf: '00000000001',
                password: '123456',
                name: 'Test User',
                birthDate: new Date('2000-01-01'),
                address: {
                    street: 'Rua teste',
                    number: 123,
                    complement: 'A',
                    neighborhood: 'Teste',
                    city: 'Teste',
                    state: 'Teste',
                    zipCode: '00000-000'
                },
                createdAt: '2024-05-15T19:14:50.891Z',
                updatedAt: '2024-05-16T21:14:02.950Z',
                deletedAt: null,
                createdByUserId: null,
                updatedByUserId: null,
                deletedByUserId: null
            };
            
            (UserRepository.prototype.findUserByCpf as jest.Mock).mockResolvedValue(user);

            const result = await userService.findUserByCpf(cpf);

            expect(UserRepository.prototype.findUserByCpf).toHaveBeenCalledWith(cpf);

            expect(result).toEqual(user);
        });
    });
});
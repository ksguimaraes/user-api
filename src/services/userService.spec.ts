import { UserService } from './userService';
import { UserRepository } from '../repositories/userRepository';
import { BadRequest } from '../_errors/badRequest';
import { UserCreateRequestDto } from '../dtos/userCreateRequestDto';
import { NotFound } from '../_errors/notFound';
import { User } from '@prisma/client';
import { Status } from '../enums/statusEnum';
import { UserUpdateRequestDto } from '../dtos/userUpdateRequestDto';

jest.mock('../repositories/userRepository');

describe('UserService', () => {
    let userService: UserService;
    let userData: UserCreateRequestDto;
    let userResult: User;
    beforeEach(() => {
        jest.clearAllMocks();
        userService = new UserService();
        userData = {
            cpf: "00000000001",
            password: "123456",
            name: "Test User",
            birthDate: new Date('2000-01-01'),
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
        userResult = {
            id: userId,
            cpf: "00000000001",
            password: "123456",
            name: "Test User",
            birthDate: new Date('2000-01-01'),
            status: 'Ativo',
            addressId: 'abcd1234',
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
            createdByUserId: null,
            updatedByUserId: null,
            deletedByUserId: null
        };
    });

    describe("Create user", () => {
        it("should create a new user", async () => {
            jest.spyOn(UserRepository.prototype, 'findUserByCpf').mockResolvedValueOnce(null);
            jest.spyOn(UserRepository.prototype, 'createUser').mockResolvedValueOnce(userResult);

            const user = await userService.createUser(userData);

            expect(UserRepository.prototype.findUserByCpf).toHaveBeenCalledWith(userData.cpf);
            expect(UserRepository.prototype.createUser).toHaveBeenCalledWith(userData, undefined);
            expect(user).toEqual(userResult);
        });

        it("should throw BadRequest error when user already exists", async () => {          
            jest.spyOn(UserRepository.prototype, 'findUserByCpf').mockResolvedValueOnce(userResult);

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
                birthDate: new Date(),
                status: Status.Ativo,
                address: {
                    id: "abcd1234",
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
            
            jest.spyOn(UserRepository.prototype, 'findUserById').mockResolvedValueOnce(user);

            const result = await userService.getUserById(userId);

            expect(UserRepository.prototype.findUserById).toHaveBeenCalledWith(userId);
            expect(result).toEqual(user);
        });

        it("should throw NotFound error when user does not exist", async () => {
            const userId = '123';
            jest.spyOn(UserRepository.prototype, 'findUserById').mockResolvedValueOnce(null);            
            await expect(userService.getUserById(userId)).rejects.toThrow(NotFound);
        });
    });

    describe("Update user", () => {
        it("should update user", async () => {
            const userId = 'abc123';
            const user = {
                id: userId,
                cpf: "00000000001",
                password: "123456",
                name: "Test User",
                birthDate: new Date(),
                status: Status.Ativo,
                address: {
                    id: "abcd1234",
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
            const updatedUser: UserUpdateRequestDto = {
                name: "teste"
            };
            userResult.name = updatedUser.name as string;

            jest.spyOn(UserRepository.prototype, 'findUserById').mockResolvedValueOnce(user);
            jest.spyOn(UserRepository.prototype, 'updateUser').mockResolvedValueOnce(userResult);

            const result = await userService.updateUser(userId, updatedUser);

            expect(UserRepository.prototype.findUserById).toHaveBeenCalledWith(userId);
            expect(UserRepository.prototype.updateUser).toHaveBeenCalledWith(userId, updatedUser, undefined);
            expect(result).toEqual(userResult);
        });

        it("should throw NotFound error when user does not exist", async () => {
            const userId = 'abc1234';
            const userData = {
                name: "Test User"
            };
            
            jest.spyOn(UserRepository.prototype, 'findUserById').mockResolvedValueOnce(null);
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
                birthDate: new Date(),
                status: Status.Ativo,
                address: {
                    id: "abcd1234",
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
            
            jest.spyOn(UserRepository.prototype, 'findUserById').mockResolvedValueOnce(user);
            jest.spyOn(UserRepository.prototype, 'deleteUser').mockResolvedValueOnce(userResult);

            await userService.deleteUser(userId);

            expect(UserRepository.prototype.findUserById).toHaveBeenCalledWith(userId);
            expect(UserRepository.prototype.deleteUser).toHaveBeenCalledWith(userId, undefined);
        });

        it("should throw NotFound error when user does not exist", async () => {
            const userId = 'abc123';
            jest.spyOn(UserRepository.prototype, 'findUserById').mockResolvedValueOnce(null);
            
            await expect(userService.deleteUser(userId)).rejects.toThrow(NotFound);
        });
    });

    describe("Find user by cpf", () => {
        it("should find user by cpf", async () => {
            const cpf = '00000000001';
            (UserRepository.prototype.findUserByCpf as jest.Mock).mockResolvedValue(userResult);

            const result = await userService.findUserByCpf(cpf);

            expect(UserRepository.prototype.findUserByCpf).toHaveBeenCalledWith(cpf);

            expect(result).toEqual(userResult);
        });
    });
});
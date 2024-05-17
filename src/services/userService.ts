import { User } from "@prisma/client";
import { BadRequest } from "../_errors/badRequest";
import { NotFound } from "../_errors/notFound";
import { UserCreateRequestDto } from "../dtos/userCreateRequestDto";
import { UserRepository } from "../repositories/userRepository";
import { UserUpdateRequestDto } from "../dtos/userUpdateRequestDto";

const userRepository = new UserRepository();
export class UserService {

    async createUser(data: UserCreateRequestDto, createdByUserId?: string): Promise<User> {
        const userExists = await this.findUserByCpf(data.cpf);
        if(userExists !== null) {
            throw new BadRequest('User already exists.');
        }

        const user = await userRepository.createUser(data, createdByUserId);
        return user;
    }

    async getUserById(id: string) {
        const user = await userRepository.findUserById(id);
        if(user === null) {
            throw new NotFound('User not found.');
        }
        return user;
    }

    async updateUser(id: string, data: UserUpdateRequestDto, updatedByUserId?: string) {
        const user = await userRepository.findUserById(id);
        if(user === null) {
            throw new NotFound('User not found.');
        }
        const updatedUser = await userRepository.updateUser(id, data, updatedByUserId);
        return updatedUser;
    }

    async deleteUser(id: string, deletedByUserId?: string) {
        const user = await userRepository.findUserById(id);
        if(user === null) {
            throw new NotFound('User not found.');
        }
        await userRepository.deleteUser(id, deletedByUserId);
    }

    async findUserByCpf(cpf: string) {
        const user = await userRepository.findUserByCpf(cpf);
        
        return user;
    }
}
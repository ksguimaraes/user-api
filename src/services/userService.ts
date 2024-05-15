import { BadRequest } from "../_errors/badRequest";
import { NotFound } from "../_errors/notFound";
import { userCreateRequestDto } from "../dtos/userCreateRequestDto";
import { 
    createUser as createUserRepository, 
    findUserByCpf as findUserByCpfRepository,
    findUserById as findUserByIdRepository,
    updateUser as updateUserRepository,
    deleteUser as deleteUserRepository
} from "../repositories/userRepository";


export const createUser = async (data: userCreateRequestDto) => {
    try {
        const userExists = await findUserByCpfRepository(data.cpf);
        if(userExists !== null) {
            throw new BadRequest('User already exists.');
        }
        const user = await createUserRepository(data);
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getUserById = async (id: string) => {
    try {
        const user = await findUserByIdRepository(id);
        if(user === null) {
            throw new NotFound('User not found.');
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const updateUser = async (id: string, data: userCreateRequestDto) => {
    try {
        const user = await findUserByIdRepository(id);
        if(user === null) {
            throw new NotFound('User not found.');
        }
        const updatedUser = await updateUserRepository(id, data);
        return updatedUser;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteUser = async (id: string) => {
    try {
        const user = await findUserByIdRepository(id);
        if(user === null) {
            throw new Error('User not found.');
        }
        await deleteUserRepository(id);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const findUserByCpf = async (cpf: string) => {
    try {
        const user = await findUserByCpfRepository(cpf);
        if(user === null) {
            throw new NotFound('User not found.');
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}
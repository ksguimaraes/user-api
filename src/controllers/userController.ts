import { FastifyRequest, FastifyReply } from 'fastify';
import { userCreateRequestDto } from '../dtos/userCreateRequestDto';
import { 
    createUser as createUserService,
    getUserById as getUserByIdService,
    updateUser as updateUserService,
    deleteUser as deleteUserService
} from '../services/userService';

export const createUser = async (request: FastifyRequest, reply: FastifyReply) => {
    let data: userCreateRequestDto;
    data = request.body as userCreateRequestDto;
    const user = await createUserService(data);
    reply.code(201).send({ userId: user.id });
}

export const getUserById = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params;
    const user = await getUserByIdService(id);
    reply.code(200).send(user);
}

export const updateUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params;
    let data: userCreateRequestDto;
    data = request.body as userCreateRequestDto;
    const user = await updateUserService(id, data);
    reply.code(200).send(user);
}

export const deleteUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params;
    await deleteUserService(id);
    reply.code(204).send();
}
import { FastifyRequest, FastifyReply } from 'fastify';
import { userCreateRequestDto } from '../dtos/userCreateRequestDto';
import { UserService } from '../services/userService';

const userService = new UserService();

export class UserController {

    async createUser(request: FastifyRequest, reply: FastifyReply) {
        let data: userCreateRequestDto;
        data = request.body as userCreateRequestDto;
        const user = await userService.createUser(data, request.user.userId);
        reply.code(201).send({ userId: user.id });
    }

    async getUserById(request: FastifyRequest, reply: FastifyReply) {
        const { id }: { id: string } = request.params;
        const user = await userService.getUserById(id);
        reply.code(200).send(user);
    }

    async updateUser(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params;
        let data: userCreateRequestDto;
        data = request.body as userCreateRequestDto;
        const user = await userService.updateUser(id, data, request.user.userId);
        reply.code(200).send(user);
    }

    async deleteUser(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params;
        await userService.deleteUser(id, request.user.userId);
        reply.code(204).send();
    }
}
import { FastifyRequest, FastifyReply } from 'fastify';
import { loginUser } from '../services/authService';

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
    const { cpf, password } = request.body;
    const token = await loginUser(cpf, password);
    reply.code(201).send({ token: token });
}
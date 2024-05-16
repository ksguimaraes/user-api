import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from '../services/authService';

const authService = new AuthService();
export class AuthController {
    async login(request: FastifyRequest, reply: FastifyReply) {
        const { cpf, password } = request.body;
        const token = await authService.loginUser(cpf, password);
        reply.code(201).send({ token: token });
    }
}
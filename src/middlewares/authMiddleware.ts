import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { AuthService } from '../services/authService';

const authService = new AuthService();

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        reply.code(401).send({ message: 'Unauthorized' });
        return;
    }

    const token = authHeader.substring(7); 
    try {
        const decodedToken = await authService.verifyToken(token);
        request.user = decodedToken;
        return;
    } catch (error) {
        reply.code(401).send({ message: 'Unauthorized' });
    }
}

export const registerAuthMiddleware = (app: FastifyInstance) => {
    app.addHook('onRequest', authenticate);
}

import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

const authController = require('../controllers/authController');

export async function authRoutes(app: FastifyInstance) {
    app
    .withTypeProvider<ZodTypeProvider>()
    .post('/auth/login', {
        schema: {
            summary: 'Login',
            tags: ['auth'],
            body: z.object({
                cpf: z.string(),
                password: z.string()
            }),
            response: {
                201: z.object({
                    token: z.string()
                }),
            }
        }
    }, authController.login);
}
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { UserCreateSchema, UserUpdateSchema } from "../dtos/userShema";
import { registerAuthMiddleware } from "../middlewares/authMiddleware";

const userController = require('../controllers/userController');

export async function userRoutes(app: FastifyInstance) {
    registerAuthMiddleware(app);
    
    app
    .withTypeProvider<ZodTypeProvider>()
    .post('/users', {
        schema: {
            summary: 'Create a new user',
            tags: ['users'],
            body: UserCreateSchema,
            response: {
                201: z.object({
                    userId: z.string()
                }),
            }
        }
    }, userController.createUser);
    
    app
    .withTypeProvider<ZodTypeProvider>()
    .get('/users/:id', {
        schema: {
            summary: 'Get user by id',
            tags: ['users'],
            params: z.object({
                id: z.string().uuid()
            }),
        }
    }, userController.getUserById);


    app
    .withTypeProvider<ZodTypeProvider>()
    .put('/users/:id', {
        schema: {
            summary: 'Update user by id',
            tags: ['users'],
            params: z.object({
                id: z.string().uuid()
            }),
            body: UserUpdateSchema,
        }
    }, userController.updateUser);

    app
    .withTypeProvider<ZodTypeProvider>()
    .delete('/users/:id', {
        schema: {
            summary: 'Delete user by id',
            tags: ['users'],
            params: z.object({
                id: z.string().uuid()
            }),
        }
    }, userController.deleteUser);
}
import { FastifyInstance } from 'fastify';
import { ZodError } from 'zod';
import { BadRequest } from '../_errors/badRequest';
import { NotFound } from '../_errors/notFound';

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandle: FastifyErrorHandler = (error, rquest, reply) => {
    if (error instanceof ZodError) {
        reply.code(400).send({
            message: 'Validation error',
            details: error.flatten().fieldErrors,
        });
    }

    if (error instanceof BadRequest) {
        reply.code(400).send({
            message: error.message,
        });
    }

    if (error instanceof NotFound) {
        reply.code(404).send({
            message: error.message,
        });
    }

    reply.code(500).send({
        message: 'Internal server error: ' + error.message,
    });
}
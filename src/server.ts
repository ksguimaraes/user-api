import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import { validatorCompiler, serializerCompiler, jsonSchemaTransform, ZodTypeProvider } from "fastify-type-provider-zod";
import { userRoutes } from "./routes/userRoutes";
import { authRoutes } from "./routes/authRoutes";
import { errorHandle } from "./utils/errorHandler";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
    origin: '*'
})

app.register(fastifySwagger, {
    swagger: {
        consumes: ['application/json'],
        produces: ['application/json'],
        info: {
            title: 'User API',
            description: 'API documentation',
            version: '1.0.0'
        },
        securityDefinitions: {
            Bearer: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
                description: 'Authorization header token, sample: Bearer #token#'
            }
        },
        security: [
            { Bearer: [] }
        ],
    },
    transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(userRoutes)
app.register(authRoutes)

app.setErrorHandler(errorHandle)

app.listen({ port: 3333 }).then(() => {
    console.log('HTTP server running!')
})

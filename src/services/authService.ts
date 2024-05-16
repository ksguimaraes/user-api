import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwtConfig';
import { NotFound } from '../_errors/notFound';
import { UserService } from './userService';

export class AuthService {
    userService = new UserService()

    async loginUser(cpf: string, password: string): Promise<string> {
        const user = await this.userService.findUserByCpf(cpf);
        if (!user) {
            throw new NotFound('User not found');
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const token = await this.generateToken(user.id);
        return token;
    }

    async generateToken(userId: string): Promise<string> {
        const token = jwt.sign({ userId: userId }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
        return token;
    }

    async verifyToken(token: string): Promise<string | jwt.JwtPayload> {
        try {
            const decoded = jwt.verify(token, jwtConfig.secret);
            return decoded;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}
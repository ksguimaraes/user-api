import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwtConfig';
import { NotFound } from '../_errors/notFound';
import { findUserByCpf } from './userService';


export const loginUser = async (cpf: string, password: string): Promise<string> => {
    const user = await findUserByCpf(cpf);
    if (!user) {
        throw new NotFound('User not found');
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const token = generateToken(user.id);
    return token;
}

export const generateToken = (userId: string): string => {
    const token = jwt.sign({ userId: userId }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
    return token;
}

export const verifyToken = (token: string): string | jwt.JwtPayload => {
    try {
        const decoded = jwt.verify(token, jwtConfig.secret);
        return decoded;
    } catch (error) {
        throw new Error('Invalid token');
    }
}
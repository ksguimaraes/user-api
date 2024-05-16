import { PrismaClient } from '@prisma/client';
import { userCreateRequestDto } from '../dtos/userCreateRequestDto';
import bcrypt from 'bcryptjs';
import { AddressRepository } from './addressRepository';
import { NotFound } from '../_errors/notFound';

const prisma = new PrismaClient();

export class UserRepository {
    addressRepository = new AddressRepository();

    async createUser(data: userCreateRequestDto, createdByUserId?: string) {
        const address = await this.addressRepository.createAddress(data.address);
        data.password = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
            data: {
                cpf: data.cpf,
                password: data.password,
                name: data.name,
                birthDate: data.birthDate,
                status: data.status,
                addressId: address.id,
                createdByUserId,
            }
        })
        return user;
    }

    async findUserByCpf(cpf: string) {
        const user = await prisma.user.findUnique({
            where: {
                cpf
            }
        })

        return user;
    }

    async findUserById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id,
                deletedAt: null
            },
            select: {
                id: true,
                cpf: true,
                password: true,
                name: true,
                birthDate: true,
                status: true,
                address: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
                createdByUserId: true,
                updatedByUserId: true,
                deletedByUserId: true,
            },
        })

        return user;
    }

    async updateUser(userId: string, data: userCreateRequestDto, updatedByUserId?: string) {
        const userExists = await this.findUserById(userId);
        if (!userExists) {
            throw new NotFound('User not found');
        }
        let newData: Partial<userCreateRequestDto> = { ...data };

        if(data.address && userExists?.address) {
            await this.addressRepository.updateAddress(userExists?.address.id, data.address);
            delete newData.address;
        }
        if(data.password) {
            newData.password = await bcrypt.hash(data.password, 10);
        }
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                ...newData,
                updatedAt: new Date(),
                updatedByUserId
            }
        })

        return user;
    }

    async deleteUser(userId: string, deletedByUserId?: string) {
        const userExists = await this.findUserById(userId);
        if (!userExists) {
            throw new NotFound('User not found');
        }

        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                status: 'Inativo',
                deletedAt: new Date(),
                deletedByUserId
            }
        })

        return user;
    }
}
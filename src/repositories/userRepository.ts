import { Prisma, PrismaClient } from '@prisma/client';
import { UserCreateRequestDto } from '../dtos/userCreateRequestDto';
import { UserUpdateRequestDto } from '../dtos/userUpdateRequestDto';
import bcrypt from 'bcryptjs';
import { AddressRepository } from './addressRepository';
import { NotFound } from '../_errors/notFound';

const prisma = new PrismaClient();

export class UserRepository {
    addressRepository = new AddressRepository();

    async createUser(data: UserCreateRequestDto, createdByUserId?: string) {
        const address = await this.addressRepository.createAddress(data.address);
        const passwordHash = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
            data: {
                cpf: data.cpf,
                password: passwordHash,
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
    
    async updateUser(userId: string, data: UserUpdateRequestDto, updatedByUserId?: string) {
        const userExists = await this.findUserById(userId);
        if (!userExists) {
            throw new NotFound('User not found');
        }
        const updateData: Prisma.UserUpdateInput = {
            ...data,
            updatedAt: new Date(),
            updatedByUser: updatedByUserId !== undefined ? { connect: { id: updatedByUserId } } : undefined,
            address: data.address !== undefined ? { update: data.address } : undefined

        };

        if(data.address && userExists?.address) {
            await this.addressRepository.updateAddress(userExists?.address.id, data.address);
            delete updateData.address
        }
        if(data.password) {
            updateData.password = await bcrypt.hash(data.password, 10);
        }
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: updateData
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
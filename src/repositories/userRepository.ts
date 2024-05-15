import { PrismaClient } from '@prisma/client';
import { userCreateRequestDto } from '../dtos/userCreateRequestDto';
import bcrypt from 'bcryptjs';
import { 
    createAddress as createAddressRepository,
    updateAddress as updateAddressRepository
} from './addressRepository';
import { NotFound } from '../_errors/notFound';

const prisma = new PrismaClient();

export const createUser = async (data: userCreateRequestDto) => {
    const address = await createAddressRepository(data.address);
    data.password = await bcrypt.hash(data.password, 10);
    

    const user = await prisma.user.create({
        data: {
            cpf: data.cpf,
            password: data.password,
            name: data.name,
            birthDate: data.birthDate,
            status: data.status,
            addressId: address.id
        }
    })
    return user;
}

export const findUserByCpf = async (cpf: string) => {
    const user = await prisma.user.findUnique({
        where: {
            cpf
        }
    })

    return user;
}

export const findUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id
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

export const updateUser = async (userId: string, data: userCreateRequestDto) => {
    const userExists = await findUserById(userId);
    if (!userExists) {
        throw new NotFound('User not found');
    }
    let newData: Partial<userCreateRequestDto> = { ...data };

    if(data.address && userExists?.address) {
        await updateAddressRepository(userExists?.address.id, data.address);
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
            updatedAt: new Date()
        }
    })

    return user;
}

export const deleteUser = async (userId: string) => {
    const userExists = await findUserById(userId);
    if (!userExists) {
        throw new NotFound('User not found');
    }

    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            status: 'Inativo',
            deletedAt: new Date()
        }
    })

    return user;
}
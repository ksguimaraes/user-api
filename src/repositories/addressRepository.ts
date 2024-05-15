import { AddressCreateRequestDto } from "../dtos/addressCreateRequestDto";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createAddress = async (data: AddressCreateRequestDto) => {
    const address = await prisma.address.create({
        data
    })
    return address;
}

export const updateAddress = async (addressId: string, data: AddressCreateRequestDto) => {
    const address = await prisma.address.update({
        where: {
            id: addressId
        },
        data
    })
    return address;
}
import { AddressCreateRequestDto } from "../dtos/addressCreateRequestDto";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AddressRepository {
    async createAddress(data: AddressCreateRequestDto) {
        const address = await prisma.address.create({
            data
        })
        return address;
    }

    async updateAddress(addressId: string, data: AddressCreateRequestDto) {
        const address = await prisma.address.update({
            where: {
                id: addressId
            },
            data
        })
        return address;
    }
}
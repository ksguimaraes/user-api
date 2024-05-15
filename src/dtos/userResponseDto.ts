import { Status } from "@prisma/client";
import { AddressCreateRequestDto } from "./addressCreateRequestDto";

export interface UserResponseDto {
    id: string;
    cpf: string;
    password: string;
    name: string;
    birthDate: Date;
    status?: Status;
    address: AddressCreateRequestDto;
    createdAt: Date;
    updatedAt: Date;
    delatedAt: Date;
    UserCreatedByUser: UserResponseDto;
    UserUpdatedByUser: UserResponseDto;
    UserDeletedByUser: UserResponseDto;
}
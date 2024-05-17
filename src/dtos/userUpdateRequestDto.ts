import { AddressUpdateRequestDto } from './addressUpdateRequestDto'; 
import { Status } from '../enums/statusEnum';

export interface UserUpdateRequestDto {
    cpf?: string;
    password?: string;
    name?: string;
    birthDate?: Date;
    status?: Status;
    address?: AddressUpdateRequestDto;
}
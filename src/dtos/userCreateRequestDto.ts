import { AddressCreateRequestDto } from './addressCreateRequestDto';
import { Status } from '../enums/statusEnum';

export interface UserCreateRequestDto {
    cpf: string;
    password: string;
    name: string;
    birthDate: Date;
    status?: Status;
    address: AddressCreateRequestDto;
}
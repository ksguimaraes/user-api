export interface AddressCreateRequestDto {
    street?: string;
    number?: number;
    complement?: string;
    neighborhood?: string;
    city: string;
    state?: string;
    zipCode?: string;
}
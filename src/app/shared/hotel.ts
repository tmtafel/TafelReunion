import { Address } from 'src/app/auth/address';

export interface Hotel {
    image: string;
    id: string;
    text: string;
    address: Address;
    phone: string;
}

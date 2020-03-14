import { Address } from 'src/app/auth/address';

export interface Hotel {
    id: string;
    name: string;
    address: Address;
    phone: string;
}

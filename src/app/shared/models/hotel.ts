import { Address } from './address';

export interface Hotel {
    id: string;
    name: string;
    address: Address;
    phone: string;
    imageUrl: string;
}

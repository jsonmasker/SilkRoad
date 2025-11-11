import { BaseModel } from "@models/base.model";

export interface StoreModel extends BaseModel {
    id: number;
    name : string;
    cityId?: number;
    districtId?: number;
    address?: string;
    phoneNumber?: string;
    email?: string;
    representative?: string;
}
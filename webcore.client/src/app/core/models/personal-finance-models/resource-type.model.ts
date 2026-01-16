import { BaseModel } from "@models/base.model";

export interface ResourceTypeModel extends BaseModel  {
    id: any;
    priority: number;
    name: string;
}
import { object, string } from "yup";

export type CreateUserType = {
    name: string;
    email: string;
    phone: string;
    password: string;
};

export type UpdateUserType = {
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    level: number;
};

export type authUserPropsType = {
    id: string;
    name: string;
    email: string;
    phone: string;
    level: number;
    created_at: Date;
    updated_at: Date;
};

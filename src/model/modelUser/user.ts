export type CreateUserType = {
    name: string;
    email: string;
    phone: string;
    password: string;
};

export type UpdateUserPassword = {
    email: string;
    password: string;
};

export type UpdateUserType = {
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
};

export type ForgoutPassByEmailType = {
    email: string;
};

export type ForgoutTokenType = {
    forgoutToken: string;
    password: string;
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

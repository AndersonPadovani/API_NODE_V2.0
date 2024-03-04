import { prisma } from "../../database/database";
import {
    CreateUserType,
    UpdateUserPassword,
    UpdateUserType,
} from "../../model/modelUser/user";

export class User {
    constructor() {}

    async selectAllUser() {
        const stmt = await prisma.user.findMany();
        return stmt;
    }

    async SelectById(id: string) {
        const stmt = await prisma.user.findFirst({ where: { id } });
        return stmt;
    }

    async SelectByEmail(email: string) {
        const stmt = await prisma.user.findFirst({ where: { email } });
        return stmt;
    }

    async SelectByPhone(phone: string) {
        const stmt = await prisma.user.findFirst({ where: { phone } });
        return stmt;
    }

    async Delete(id: string) {
        const stmt = await prisma.user.delete({ where: { id } });
        return stmt;
    }

    async Update({ id, name, email, phone, password }: UpdateUserType) {
        const stmt = await prisma.user.update({
            data: { name, email, phone, password, updated_at: new Date() },
            where: { id },
        });

        return stmt;
    }

    async UpdatePasswordByEmail({ email, password }: UpdateUserPassword) {
        const stmt = await prisma.user.update({
            data: { password, updated_at: new Date() },
            where: { email },
        });

        return stmt;
    }

    async Create({ name, email, phone, password }: CreateUserType) {
        const stmt = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                password,
            },
        });

        return stmt;
    }
}

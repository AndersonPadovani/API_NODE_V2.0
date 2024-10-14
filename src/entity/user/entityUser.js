import { prisma } from "../../database/database";
export class User {
    constructor() { }
    async selectAllUser() {
        const stmt = await prisma.user.findMany();
        return stmt;
    }
    async SelectById(id) {
        const stmt = await prisma.user.findFirst({ where: { id } });
        return stmt;
    }
    async SelectByEmail(email) {
        const stmt = await prisma.user.findFirst({ where: { email } });
        return stmt;
    }
    async SelectByPhone(phone) {
        const stmt = await prisma.user.findFirst({ where: { phone } });
        return stmt;
    }
    async Delete(id) {
        const stmt = await prisma.user.delete({ where: { id } });
        return stmt;
    }
    async Update({ id, name, email, phone, password }) {
        const stmt = await prisma.user.update({
            data: { name, email, phone, password, updated_at: new Date() },
            where: { id },
        });
        return stmt;
    }
    async UpdatePasswordByEmail({ email, password }) {
        const stmt = await prisma.user.update({
            data: { password, updated_at: new Date() },
            where: { email },
        });
        return stmt;
    }
    async Create({ name, email, phone, password }) {
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

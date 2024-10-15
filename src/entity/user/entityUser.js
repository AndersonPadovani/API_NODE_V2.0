"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const database_1 = require("../../database/database");
class User {
    constructor() { }
    async selectAllUser() {
        const stmt = await database_1.prisma.user.findMany();
        return stmt;
    }
    async SelectById(id) {
        const stmt = await database_1.prisma.user.findFirst({ where: { id } });
        return stmt;
    }
    async SelectByEmail(email) {
        const stmt = await database_1.prisma.user.findFirst({ where: { email } });
        return stmt;
    }
    async SelectByPhone(phone) {
        const stmt = await database_1.prisma.user.findFirst({ where: { phone } });
        return stmt;
    }
    async Delete(id) {
        const stmt = await database_1.prisma.user.delete({ where: { id } });
        return stmt;
    }
    async Update({ id, name, email, phone, password }) {
        const stmt = await database_1.prisma.user.update({
            data: { name, email, phone, password, updated_at: new Date() },
            where: { id },
        });
        return stmt;
    }
    async UpdatePasswordByEmail({ email, password }) {
        const stmt = await database_1.prisma.user.update({
            data: { password, updated_at: new Date() },
            where: { email },
        });
        return stmt;
    }
    async Create({ name, email, phone, password }) {
        const stmt = await database_1.prisma.user.create({
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
exports.User = User;

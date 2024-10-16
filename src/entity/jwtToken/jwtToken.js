"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtToken = void 0;
const database_1 = require("../../database/database");
class JwtToken {
    constructor() { }
    async Save({ jti, uId }) {
        const stmt = await database_1.prisma.jwtToken.create({ data: { jti, uId } });
        return stmt;
    }
    async Select(jti) {
        const stmt = await database_1.prisma.jwtToken.findFirst({ where: { jti } });
        return stmt;
    }
    async SelectByUid(uId) {
        const stmt = await database_1.prisma.jwtToken.findFirst({
            where: { uId: uId },
            orderBy: { createdAt: "desc" },
        });
        return stmt;
    }
    async Update(jti) {
        const stmt = await database_1.prisma.jwtToken.update({
            data: { used: 1 },
            where: { jti },
        });
        return stmt;
    }
}
exports.JwtToken = JwtToken;

import { prisma } from "../../database/database";

export class JwtToken {
    constructor() {}

    async Save(jti: string) {
        const stmt = await prisma.jwtToken.create({ data: { jti } });
        return stmt;
    }

    async Select(jti: string) {
        const stmt = await prisma.jwtToken.findFirst({ where: { jti } });
        return stmt;
    }

    async Update(jti: string) {
        const stmt = await prisma.jwtToken.update({
            data: { used: 1 },
            where: { jti },
        });

        return stmt;
    }
}

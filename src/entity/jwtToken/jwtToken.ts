import { prisma } from "../../database/database";

type JwtTokenType = {
  id?: string;
  jti: string;
  used?: number;
  uId: string;
  createdAt?: Date;
};

export class JwtToken {
  constructor() {}

  async Save({ jti, uId }: JwtTokenType) {
    const stmt = await prisma.jwtToken.create({ data: { jti, uId } });
    return stmt;
  }

  async Select(jti: string) {
    const stmt = await prisma.jwtToken.findFirst({ where: { jti } });
    return stmt;
  }

  async SelectByUid(uId: string) {
    const stmt = await prisma.jwtToken.findFirst({ where: { uId: uId } });
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

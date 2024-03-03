import { prisma } from "../../database/database";
import { User } from "../../entity/user/entityUser";
import { NotFound } from "../../utils/ApiError";

export async function ValidateUserDeleteById(id: string) {
    const resp = await prisma.user.findFirst({ where: { id } });

    if (!resp) {
        throw new NotFound(`ID: ${id}, não cadastrado no sistema!`);
    }
}

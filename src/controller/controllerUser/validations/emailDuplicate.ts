import { prisma } from "../../../database/database";
import { Conflict } from "../../../utils/ApiError";

export async function ValidateUserEmailDuplicate(email: string, id?: string) {
    const resp = await prisma.user.findFirst({ where: { email: email } });

    if (!id) {
        if (resp) {
            throw new Conflict(`${email} já cadastrado no sistema!`);
        }
    }

    if (resp) {
        if (resp?.id !== id) {
            throw new Conflict(`${email} já cadastrado no sistema!`);
        }
    }

    return;
}

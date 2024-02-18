import { prisma } from "../../../database/database";
import { Conflict } from "../../../utils/ApiError";

export async function ValidateUserPhoneDuplicate(phone: string, id?: string) {
    const resp = await prisma.user.findFirst({ where: { phone } });

    if (!id) {
        if (resp) {
            throw new Conflict(`${phone} já cadastrado no sistema!`);
        }
    }
    if (resp) {
        if (resp?.id != id) {
            throw new Conflict(`${phone} já cadastrado no sistema!`);
        }
    }

    return;
}

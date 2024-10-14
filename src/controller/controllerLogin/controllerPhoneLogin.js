import { prisma } from "../../database/database";
import { Unautorized } from "../../utils/ApiError";
import { PasswordEncript } from "../../utils/PasswordEncript";
import { CreateJwt } from "../../Auth/authJwt";
import { MidLoginPhone } from "../../middleware/midLogin/midLoginEmail/midLoginPhone";
export async function ControllerLoginPhone(request, response, next) {
    const { phone, password } = request.body;
    await MidLoginPhone({ phone, password });
    const validUser = await prisma.user.findUnique({ where: { phone } });
    if (!validUser) {
        throw new Unautorized(`${phone} não cadastrado no sistema!`);
    }
    if (validUser.password != PasswordEncript(password)) {
        throw new Unautorized("Senha incorreta!");
    }
    const { password: pass, level, ...payload } = validUser;
    const JWT = await CreateJwt(payload);
    request.body.AuthPropr = { JWT };
    next();
}

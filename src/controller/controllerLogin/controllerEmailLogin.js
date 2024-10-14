import { MidLoginEmail } from "../../middleware/midLogin/midLoginEmail/midLoginEmail";
import { prisma } from "../../database/database";
import { Unautorized } from "../../utils/ApiError";
import { PasswordEncript } from "../../utils/PasswordEncript";
import { CreateJwt } from "../../Auth/authJwt";
export async function ControllerLoginEmail(request, response, next) {
    const { email, password } = request.body;
    await MidLoginEmail({ email, password });
    const validUser = await prisma.user.findUnique({ where: { email } });
    if (!validUser) {
        throw new Unautorized(`${email} não cadastrado no sistema!`);
    }
    if (validUser.password != PasswordEncript(password)) {
        throw new Unautorized("Senha incorreta!");
    }
    const { password: pass, level, ...payload } = validUser;
    const JWT = await CreateJwt(payload);
    request.body.AuthPropr = { JWT };
    next();
}

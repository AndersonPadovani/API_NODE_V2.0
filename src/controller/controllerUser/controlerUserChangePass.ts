import { NextFunction, Request, Response } from "express";
import { ForgoutTokenType } from "../../model/modelUser/user";
import { MidForgoutChangePass } from "../../middleware/midUser/midUserChangePass/midUserChangePass";
import { ValidateJwtToken } from "../../Auth/authJwt";
import { User } from "../../entity/user/entityUser";
import { BadRequest, Unautorized } from "../../utils/ApiError";
import { PasswordEncript } from "../../utils/PasswordEncript";
import { JwtToken } from "../../entity/jwtToken/jwtToken";
import { error } from "console";
import { JwtValidEnum } from "../../enum/enum";

export async function ControllerUserChangePass(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { forgoutToken, password: pass } = request.body as ForgoutTokenType;
    const password = PasswordEncript(pass);

    await MidForgoutChangePass({ forgoutToken, password });

    const validateJwt = await ValidateJwtToken(forgoutToken).catch((error) => {
        throw new Unautorized(error);
    });

    const email = validateJwt.PAYLOAD.email;

    const jwtData = new JwtToken();
    const expired = await jwtData.Select(validateJwt.jti);

    if (expired?.used === JwtValidEnum.INVALID) {
        throw new Unautorized("Token já foi utilizado!");
    }

    const jwtUpdate = await jwtData.Update(validateJwt.jti);
    if (!jwtUpdate) {
        throw new Unautorized(
            "Não foi possivel atualizar a senha, token quebrado!"
        );
    }
    const user = new User();
    user.UpdatePasswordByEmail({ email, password });

    next();
}

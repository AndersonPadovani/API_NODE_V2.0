import { NextFunction, Request, Response } from "express";
import { ForgoutPassByEmail } from "../../model/modelUser/user";
import { MidForgoutByEmail } from "../../middleware/midUser/midUserForgout/midForgoutByEmail";
import { User } from "../../entity/user/entityUser";
import { NotFound } from "../../utils/ApiError";
import { CreateJwt } from "../../Auth/authJwt";

export async function ControllerUserForgout(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { email } = request.body as ForgoutPassByEmail;

    await MidForgoutByEmail({ email });

    const user = new User();

    const validateEmail = await user.SelectByEmail(email);

    if (!validateEmail) {
        throw new NotFound(`${email} não cadastrado no sistema!`);
    }

    const jwtForgoutCreate = CreateJwt([validateEmail.id, validateEmail.email]);

    next();
}

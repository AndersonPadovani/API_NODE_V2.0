import { NextFunction, Request, Response } from "express";
import { UpdateUserType } from "../../model/modelUser/user";
import { MidUserUpdate } from "../../middleware/midUser/midUserUpdate/midUserUpdate";
import { ValidateUserEmailDuplicate } from "../validations/emailDuplicate";
import { ValidateUserPhoneDuplicate } from "../validations/phoneDuplicate";
import { User } from "../../entity/user/entityUser";
import { PasswordEncript } from "../../utils/PasswordEncript";
import { NotFound, Unautorized } from "../../utils/ApiError";

export async function ControllerUserUpdate(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const dbUser = new User();

    const { id } = request.body.authUserProps;

    const lastUser = await dbUser.SelectById(id);

    if (!lastUser) {
        throw new NotFound("Usuario não localizado!");
    }

    const {
        name = lastUser.name,
        email = lastUser.email,
        phone = lastUser.phone,
        password: pass = lastUser.password,
    } = request.body as UpdateUserType;
    let password = pass;

    await MidUserUpdate({ id, name, email, phone, password });

    password = PasswordEncript(pass);

    await ValidateUserEmailDuplicate(email, id);
    await ValidateUserPhoneDuplicate(phone, id);

    const user = new User();
    user.Update({ id, name, email, phone, password });
    next();
}

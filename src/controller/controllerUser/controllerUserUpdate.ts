import { NextFunction, Request, Response } from "express";
import { UpdateUserType } from "../../model/modelUser/user";
import { MidUserUpdate } from "../../middleware/midUser/midUserUpdate/midUserUpdate";
import { ValidateUserEmailDuplicate } from "./validations/emailDuplicate";
import { ValidateUserPhoneDuplicate } from "./validations/phoneDuplicate";
import { User } from "../../entity/user/entityUser";
import { PasswordEncript } from "../../utils/PasswordEncript";
import { StatusUserEnum } from "../../enum/enum";

export async function ControllerUserUpdate(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const {
        name,
        email,
        phone,
        password: pass,
        level = StatusUserEnum.user,
    } = request.body as UpdateUserType;
    let password = pass;

    const { id } = request.body.authUserProps;

    await MidUserUpdate({ id, name, email, phone, password, level });

    password = PasswordEncript(pass);

    await ValidateUserEmailDuplicate(email, id);
    await ValidateUserPhoneDuplicate(phone, id);

    const user = new User();
    user.Update({ id, name, email, phone, password, level });
    next();
}

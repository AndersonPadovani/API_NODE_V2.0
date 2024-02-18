import { NextFunction, Request, Response } from "express";
import { MidUserDelete } from "../../middleware/midUser/midUserDelete/midUserDelete";
import { User } from "../../entity/user/entityUser";
import { ValidateUserDeleteById } from "./validations/selectById";

export async function ControllerUserDelete(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { id } = request.body;

    await MidUserDelete({ id });

    await ValidateUserDeleteById(id);

    const user = new User();
    user.Delete(id);
    next();
}

import { NextFunction, Request, Response } from "express";
import { User } from "../../entity/user/entityUser";
import { authUserPropsType } from "../../model/modelUser/user";

export async function ControllerUserSelectAll(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const user = new User();
    const usersProps = await user.selectAllUser();

    request.body.DataUser = usersProps;
    next();
}

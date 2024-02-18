import { NextFunction, Request, Response } from "express";
import { BadRequest } from "../utils/ApiError";
import { CreateJwt, ValidateJwtToken } from "./authJwt";
import { User } from "../entity/user/entityUser";
import { UserArgs } from "@prisma/client/runtime/library";
import { authUserPropsType } from "../model/modelUser/user";
import { LoginEmailType } from "../model/modelLogin/modelLogin";

export async function AuthUser(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authorization = request.headers.authorization;

    const user = new User();

    if (!authorization) {
        throw new BadRequest("Bearer Token não informado!");
    }

    const [, token] = authorization.split(" ");

    const { PAYLOAD } = await ValidateJwtToken(token);
    request.body.authUserProps = PAYLOAD;

    next();
}

import { NextFunction, Request, Response } from "express";
import { BadRequest, Unautorized } from "../utils/ApiError";
import { CreateJwt, ValidateJwtToken } from "./authJwt";
import { User } from "../entity/user/entityUser";
import { authUserPropsType } from "../model/modelUser/user";
import { StatusUserEnum } from "../enum/enum";
import { prisma } from "../database/database";

export async function AuthAdmin(
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

    const userProps = await prisma.user.findUnique({
        where: { id: PAYLOAD.id },
    });

    if (!userProps) {
        throw new Unautorized(`${PAYLOAD.email} usuario não cadastrado!`);
    }

    if (userProps.level < StatusUserEnum.admin) {
        throw new Unautorized(`${userProps.email} não e um administrador!`);
    }

    request.body.authUserProps = PAYLOAD;

    next();
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthAdmin = void 0;
const ApiError_1 = require("../utils/ApiError");
const authJwt_1 = require("./authJwt");
const entityUser_1 = require("../entity/user/entityUser");
const enum_1 = require("../enum/enum");
const database_1 = require("../database/database");
async function AuthAdmin(request, response, next) {
    const authorization = request.headers.authorization;
    const user = new entityUser_1.User();
    if (!authorization) {
        throw new ApiError_1.BadRequest("Bearer Token não informado!");
    }
    const [, token] = authorization.split(" ");
    const { PAYLOAD } = await (0, authJwt_1.ValidateJwtToken)(token);
    const userProps = await database_1.prisma.user.findUnique({
        where: { id: PAYLOAD.id },
    });
    if (!userProps) {
        throw new ApiError_1.Unautorized(`${PAYLOAD.email} usuario não cadastrado!`);
    }
    if (userProps.level < enum_1.StatusUserEnum.admin) {
        throw new ApiError_1.Unautorized(`${userProps.email} não e um administrador!`);
    }
    request.body.authUserProps = PAYLOAD;
    next();
}
exports.AuthAdmin = AuthAdmin;

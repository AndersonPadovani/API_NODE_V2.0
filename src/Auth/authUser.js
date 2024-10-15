"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = AuthUser;
const ApiError_1 = require("../utils/ApiError");
const authJwt_1 = require("./authJwt");
async function AuthUser(request, response, next) {
    const authorization = request.headers.authorization;
    if (!authorization) {
        throw new ApiError_1.BadRequest("Bearer Token não informado!");
    }
    const [, token] = authorization.split(" ");
    const { PAYLOAD } = await (0, authJwt_1.ValidateJwtToken)(token);
    request.body.authUserProps = PAYLOAD;
    next();
}

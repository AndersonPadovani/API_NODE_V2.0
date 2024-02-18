"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = void 0;
const ApiError_1 = require("../utils/ApiError");
const authJwt_1 = require("./authJwt");
const entityUser_1 = require("../entity/user/entityUser");
async function AuthUser(request, response, next) {
    const authorization = request.headers.authorization;
    const user = new entityUser_1.User();
    if (!authorization) {
        throw new ApiError_1.BadRequest("Bearer Token não informado!");
    }
    const [, token] = authorization.split(" ");
    const { PAYLOAD } = await (0, authJwt_1.ValidateJwtToken)(token);
    request.body.authUserProps = PAYLOAD;
    next();
}
exports.AuthUser = AuthUser;

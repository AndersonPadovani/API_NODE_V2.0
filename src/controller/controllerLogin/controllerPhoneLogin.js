"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerLoginPhone = ControllerLoginPhone;
const database_1 = require("../../database/database");
const ApiError_1 = require("../../utils/ApiError");
const PasswordEncript_1 = require("../../utils/PasswordEncript");
const authJwt_1 = require("../../Auth/authJwt");
const midLoginPhone_1 = require("../../middleware/midLogin/midLoginEmail/midLoginPhone");
async function ControllerLoginPhone(request, response, next) {
    const { phone, password } = request.body;
    await (0, midLoginPhone_1.MidLoginPhone)({ phone, password });
    const validUser = await database_1.prisma.user.findUnique({ where: { phone } });
    if (!validUser) {
        throw new ApiError_1.Unautorized(`${phone} não cadastrado no sistema!`);
    }
    if (validUser.password != (0, PasswordEncript_1.PasswordEncript)(password)) {
        throw new ApiError_1.Unautorized("Senha incorreta!");
    }
    const { password: pass, level, ...payload } = validUser;
    const JWT = await (0, authJwt_1.CreateJwt)(payload);
    request.body.AuthPropr = { JWT };
    next();
}

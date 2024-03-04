"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerUserChangePass = void 0;
const midUserChangePass_1 = require("../../middleware/midUser/midUserChangePass/midUserChangePass");
const authJwt_1 = require("../../Auth/authJwt");
const entityUser_1 = require("../../entity/user/entityUser");
const ApiError_1 = require("../../utils/ApiError");
const PasswordEncript_1 = require("../../utils/PasswordEncript");
const jwtToken_1 = require("../../entity/jwtToken/jwtToken");
const enum_1 = require("../../enum/enum");
async function ControllerUserChangePass(request, response, next) {
    const { forgoutToken, password: pass } = request.body;
    const password = (0, PasswordEncript_1.PasswordEncript)(pass);
    await (0, midUserChangePass_1.MidForgoutChangePass)({ forgoutToken, password });
    const validateJwt = await (0, authJwt_1.ValidateJwtToken)(forgoutToken).catch((error) => {
        throw new ApiError_1.Unautorized(error);
    });
    const email = validateJwt.PAYLOAD.email;
    const jwtData = new jwtToken_1.JwtToken();
    const expired = await jwtData.Select(validateJwt.jti);
    if ((expired === null || expired === void 0 ? void 0 : expired.used) === enum_1.JwtValidEnum.INVALID) {
        throw new ApiError_1.Unautorized("Token já foi utilizado!");
    }
    const jwtUpdate = await jwtData.Update(validateJwt.jti);
    if (!jwtUpdate) {
        throw new ApiError_1.Unautorized("Não foi possivel atualizar a senha, token quebrado!");
    }
    const user = new entityUser_1.User();
    user.UpdatePasswordByEmail({ email, password });
    next();
}
exports.ControllerUserChangePass = ControllerUserChangePass;

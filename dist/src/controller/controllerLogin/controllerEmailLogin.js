"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerLoginEmail = void 0;
const midLoginEmail_1 = require("../../middleware/midLogin/midLoginEmail/midLoginEmail");
const database_1 = require("../../database/database");
const ApiError_1 = require("../../utils/ApiError");
const PasswordEncript_1 = require("../../utils/PasswordEncript");
const authJwt_1 = require("../../Auth/authJwt");
async function ControllerLoginEmail(request, response, next) {
    const { email, password } = request.body;
    await (0, midLoginEmail_1.MidLoginEmail)({ email, password });
    const validUser = await database_1.prisma.user.findUnique({ where: { email } });
    if (!validUser) {
        throw new ApiError_1.Unautorized(`${email} não cadastrado no sistema!`);
    }
    if (validUser.password != (0, PasswordEncript_1.PasswordEncript)(password)) {
        throw new ApiError_1.Unautorized("Senha incorreta!");
    }
    const { password: pass, level } = validUser, payload = __rest(validUser, ["password", "level"]);
    const JWT = await (0, authJwt_1.CreateJwt)(payload);
    request.body.AuthPropr = { JWT };
    next();
}
exports.ControllerLoginEmail = ControllerLoginEmail;

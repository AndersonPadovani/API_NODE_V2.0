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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateJwtResePass = exports.ValidateJwtToken = exports.CreateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = require("../utils/ApiError");
const jwtToken_1 = require("../entity/jwtToken/jwtToken");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function CreateJwt(payload) {
    const { password } = payload, PAYLOAD = __rest(payload, ["password"]);
    return jsonwebtoken_1.default.sign({ PAYLOAD }, process.env.JWT_PASSWORD, {
        expiresIn: "1H",
    });
}
exports.CreateJwt = CreateJwt;
async function ValidateJwtToken(token) {
    return new Promise(async (resolve, reject) => {
        jsonwebtoken_1.default.verify(token, process.env.JWT_PASSWORD, async (err, decode) => {
            if (err) {
                reject(err.message);
            }
            resolve(decode);
        });
    });
}
exports.ValidateJwtToken = ValidateJwtToken;
async function CreateJwtResePass(PAYLOAD) {
    // ID exclusivo para o token
    const jti = Math.random().toString(36).substring(7);
    // Expiração em 5 minutos (ajuste conforme necessário)
    const expiracao = Math.floor(Date.now() / 1000) + 300;
    const data = {
        jti: jti,
        exp: expiracao,
        PAYLOAD,
    };
    const token = jsonwebtoken_1.default.sign(data, process.env.JWT_PASSWORD);
    if (token) {
        const jwtSave = new jwtToken_1.JwtToken();
        const validate = await jwtSave.Select(jti);
        if (validate) {
            throw new ApiError_1.Unautorized("Jwt já cadastrado!");
        }
        await jwtSave.Save(jti);
    }
    return token;
}
exports.CreateJwtResePass = CreateJwtResePass;

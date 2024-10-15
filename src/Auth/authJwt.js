"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateJwt = CreateJwt;
exports.ValidateJwtToken = ValidateJwtToken;
exports.CreateJwtResePass = CreateJwtResePass;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = require("../utils/ApiError");
const jwtToken_1 = require("../entity/jwtToken/jwtToken");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function CreateJwt(payload) {
    const { password, ...PAYLOAD } = payload;
    return jsonwebtoken_1.default.sign({ PAYLOAD }, process.env.JWT_PASSWORD, {
        expiresIn: "1H",
    });
}
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

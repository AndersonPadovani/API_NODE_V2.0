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
exports.ValidateJwtToken = exports.CreateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = require("../utils/ApiError");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function CreateJwt(payload) {
    const { password } = payload, PAYLOAD = __rest(payload, ["password"]);
    return jsonwebtoken_1.default.sign({ PAYLOAD }, process.env.JWT_PASSWORD, {
        expiresIn: "1H",
    });
}
exports.CreateJwt = CreateJwt;
async function ValidateJwtToken(token) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, process.env.JWT_PASSWORD, (err, decode) => {
            if (err) {
                throw new ApiError_1.Unautorized(err.message);
            }
            resolve(decode);
        });
    });
}
exports.ValidateJwtToken = ValidateJwtToken;

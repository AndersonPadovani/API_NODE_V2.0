"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MidErrorsApi = void 0;
const MidErrorsApi = (error, request, response, next) => {
    var _a;
    const stsCode = (_a = error.statusCode) !== null && _a !== void 0 ? _a : 500;
    // const msgErro = error.statusCode ? error.message : "Internal Server Error!";
    const msgErro = error.statusCode
        ? error.message
        : "Internal Server Error: " + error.message;
    response.status(stsCode).json({ message: msgErro });
};
exports.MidErrorsApi = MidErrorsApi;

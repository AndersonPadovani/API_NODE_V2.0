"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginPhoneSchema = void 0;
const yup_1 = require("yup");
exports.validateLoginPhoneSchema = (0, yup_1.object)({
    phone: (0, yup_1.string)()
        .required("Prenecha o campo Telefone!")
        .length(16, "Telefone inserido esta invalido!"),
    password: (0, yup_1.string)()
        .required("Preencha o campo Senha!")
        .min(4, "Sua Senha deve conter pelomenos 4 caracteres!"),
});

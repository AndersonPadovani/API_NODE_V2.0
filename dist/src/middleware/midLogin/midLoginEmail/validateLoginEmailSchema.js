"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginEmailSchema = void 0;
const yup_1 = require("yup");
exports.validateLoginEmailSchema = (0, yup_1.object)({
    email: (0, yup_1.string)().required("Preencha o campo Email!").email(),
    password: (0, yup_1.string)()
        .required("Preencha o campo Senha!")
        .min(4, "Sua Senha deve conter pelomenos 4 caracteres!"),
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserChangePassSchema = void 0;
const yup_1 = require("yup");
exports.validateUserChangePassSchema = (0, yup_1.object)({
    forgoutToken: (0, yup_1.string)().required().min(10),
    password: (0, yup_1.string)()
        .required("Preencha o campo Senha!")
        .min(4, "Sua Senha deve conter pelomenos 4 caracteres!"),
});

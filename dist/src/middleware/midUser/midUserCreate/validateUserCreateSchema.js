"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserCreateSchema = void 0;
const yup_1 = require("yup");
exports.validateUserCreateSchema = (0, yup_1.object)({
    name: (0, yup_1.string)()
        .required("Preencha o campo Nome!")
        .min(4, "O Nome deve conter no minimo 4 letras!"),
    email: (0, yup_1.string)().required("Preencha o campo Email!").email(),
    phone: (0, yup_1.string)()
        .required("Prenecha o campo Telefone!")
        .length(16, "Telefone inserido esta invalido!"),
    password: (0, yup_1.string)()
        .required("Preencha o campo Senha!")
        .min(4, "Sua Senha deve conter pelomenos 4 caracteres!"),
});

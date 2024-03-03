"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserForgoutByEmailSchema = void 0;
const yup_1 = require("yup");
exports.validateUserForgoutByEmailSchema = (0, yup_1.object)({
    email: (0, yup_1.string)().required("Preencha o campo Email!").email(),
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserDeleteSchema = void 0;
const yup_1 = require("yup");
exports.validateUserDeleteSchema = (0, yup_1.object)({
    id: (0, yup_1.string)()
        .uuid("Id inserido no formato invalido!")
        .required("Id usuario invalido!"),
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const vitest_1 = require("vitest");
const entityUser_1 = require("../entity/user/entityUser");
const user = new entityUser_1.User();
const newUser = {
    name: "teste",
    email: "teste@teste.com.br",
    phone: "(00) 0 0000-0000",
    password: "teste",
};
const newUpdateUser = {
    name: "teste2",
    email: "teste2@teste.com.br",
    phone: "(11) 1 1111-1111",
    password: "teste2",
};
let jwtUser = "";
axios_1.default.interceptors.response.use((response) => response, (error) => {
    if (error.response && error.response.status === 409) {
        // Se for um erro 409, retorne a resposta
        return Promise.resolve(error.response);
    }
    if (error.response && error.response.status === 404) {
        // Se for um erro 404, retorne a resposta
        return Promise.resolve(error.response);
    }
    if (error.response && error.response.status === 401) {
        // Se for um erro 401, retorne a resposta
        return Promise.resolve(error.response);
    }
    // Para outros erros, rejeite a Promise normalmente
    return Promise.reject(error);
});
(0, vitest_1.test)("Testa se o servidor esta online", async () => {
    const { data, status } = await (0, axios_1.default)({
        baseURL: process.env.BASE_URL,
        method: "get",
    });
    (0, vitest_1.expect)(status).toEqual(200);
    (0, vitest_1.expect)(data.name).toEqual(process.env.API_NAME);
});
(0, vitest_1.test)("Criar um usuario no banco de dados!", async () => {
    const { status } = await (0, axios_1.default)({
        baseURL: process.env.BASE_URL + "/user",
        method: "post",
        data: newUser,
    });
    (0, vitest_1.expect)(status).toEqual(201);
});
(0, vitest_1.test)("Não cria usuario duplicado", async () => {
    const { data, status } = await (0, axios_1.default)({
        baseURL: process.env.BASE_URL + "/user",
        method: "post",
        data: newUser,
    });
    (0, vitest_1.expect)(data.message).toEqual("teste@teste.com.br já cadastrado no sistema!");
    (0, vitest_1.expect)(status).toEqual(409);
});
(0, vitest_1.test)("Não deve conseguir Logar na aplicação com o email e senha errado", async () => {
    const { data, status } = await (0, axios_1.default)({
        baseURL: process.env.BASE_URL + "/login/email",
        method: "post",
        data: {
            email: "teste@teste.com.br",
            password: "1234",
        },
    });
    (0, vitest_1.expect)(status).toEqual(401);
});
(0, vitest_1.test)("Login na aplicação com o email e senha do usuario teste", async () => {
    const { data, status } = await (0, axios_1.default)({
        baseURL: process.env.BASE_URL + "/login/email",
        method: "post",
        data: {
            email: newUser.email,
            password: newUser.password,
        },
    });
    jwtUser = data.JWT;
    (0, vitest_1.expect)(jwtUser).not.toBeNull();
    (0, vitest_1.expect)(status).toEqual(200);
});
(0, vitest_1.test)("Atualiza o suaurio teste no banco de dados!", async () => {
    const { status } = await (0, axios_1.default)({
        baseURL: process.env.BASE_URL + "/user",
        method: "patch",
        headers: { Authorization: `Bearer ${jwtUser}` },
        data: newUpdateUser,
    });
    (0, vitest_1.expect)(status).toEqual(204);
});
(0, vitest_1.test)("Deleta o usuario teste do banco de dados!", async () => {
    const { status } = await (0, axios_1.default)({
        baseURL: process.env.BASE_URL + "/user",
        method: "delete",
        headers: { Authorization: `Bearer ${jwtUser}` },
    });
    (0, vitest_1.expect)(status).toEqual(204);
});
(0, vitest_1.test)("Não deve Deletar o usuario id do token invalido", async () => {
    const { data, status } = await (0, axios_1.default)({
        baseURL: process.env.BASE_URL + "/user",
        method: "delete",
        headers: {
            Authorization: `Bearer ${jwtUser}`,
        },
    });
    (0, vitest_1.expect)(status).toEqual(404);
});

import axios from "axios";
import { test, expect } from "vitest";
import { User } from "../entity/user/entityUser";
const user = new User();
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
axios.interceptors.response.use((response) => response, (error) => {
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
test("Testa se o servidor esta online", async () => {
    const { data, status } = await axios({
        baseURL: process.env.BASE_URL,
        method: "get",
    });
    expect(status).toEqual(200);
    expect(data.name).toEqual(process.env.API_NAME);
});
test("Criar um usuario no banco de dados!", async () => {
    const { status } = await axios({
        baseURL: process.env.BASE_URL + "/user",
        method: "post",
        data: newUser,
    });
    expect(status).toEqual(201);
});
test("Não cria usuario duplicado", async () => {
    const { data, status } = await axios({
        baseURL: process.env.BASE_URL + "/user",
        method: "post",
        data: newUser,
    });
    expect(data.message).toEqual("teste@teste.com.br já cadastrado no sistema!");
    expect(status).toEqual(409);
});
test("Não deve conseguir Logar na aplicação com o email e senha errado", async () => {
    const { data, status } = await axios({
        baseURL: process.env.BASE_URL + "/login/email",
        method: "post",
        data: {
            email: "teste@teste.com.br",
            password: "1234",
        },
    });
    expect(status).toEqual(401);
});
test("Login na aplicação com o email e senha do usuario teste", async () => {
    const { data, status } = await axios({
        baseURL: process.env.BASE_URL + "/login/email",
        method: "post",
        data: {
            email: newUser.email,
            password: newUser.password,
        },
    });
    jwtUser = data.JWT;
    expect(jwtUser).not.toBeNull();
    expect(status).toEqual(200);
});
test("Atualiza o suaurio teste no banco de dados!", async () => {
    const { status } = await axios({
        baseURL: process.env.BASE_URL + "/user",
        method: "patch",
        headers: { Authorization: `Bearer ${jwtUser}` },
        data: newUpdateUser,
    });
    expect(status).toEqual(204);
});
test("Deleta o usuario teste do banco de dados!", async () => {
    const { status } = await axios({
        baseURL: process.env.BASE_URL + "/user",
        method: "delete",
        headers: { Authorization: `Bearer ${jwtUser}` },
    });
    expect(status).toEqual(204);
});
test("Não deve Deletar o usuario id do token invalido", async () => {
    const { data, status } = await axios({
        baseURL: process.env.BASE_URL + "/user",
        method: "delete",
        headers: {
            Authorization: `Bearer ${jwtUser}`,
        },
    });
    expect(status).toEqual(404);
});

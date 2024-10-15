"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerLogin = void 0;
const express_1 = require("express");
const controllerEmailLogin_1 = require("../../controller/controllerLogin/controllerEmailLogin");
const controllerPhoneLogin_1 = require("../../controller/controllerLogin/controllerPhoneLogin");
const routerLogin = (0, express_1.Router)();
exports.routerLogin = routerLogin;
routerLogin.post("/login/email", controllerEmailLogin_1.ControllerLoginEmail, (request, response) => {
    response.status(200).json(request.body.AuthPropr);
});
routerLogin.post("/login/phone", controllerPhoneLogin_1.ControllerLoginPhone, (request, response) => {
    response.status(200).json(request.body.AuthPropr);
});

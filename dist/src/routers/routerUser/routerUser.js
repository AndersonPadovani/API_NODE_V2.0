"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUser = void 0;
const express_1 = require("express");
const controllerUserCreate_1 = require("../../controller/controllerUser/controllerUserCreate");
const controllerUserUpdate_1 = require("../../controller/controllerUser/controllerUserUpdate");
const controllerUserDelete_1 = require("../../controller/controllerUser/controllerUserDelete");
const controllerUserSelectAll_1 = require("../../controller/controllerUser/controllerUserSelectAll");
const authUser_1 = require("../../Auth/authUser");
const authAdmin_1 = require("../../Auth/authAdmin");
const controllerUserForgout_1 = require("../../controller/controllerUser/controllerUserForgout");
const routerUser = (0, express_1.Router)();
exports.routerUser = routerUser;
routerUser.get("/user", authAdmin_1.AuthAdmin, controllerUserSelectAll_1.ControllerUserSelectAll, (request, response) => {
    const userProps = request.body.DataUser;
    // response.status(200).json(request.body.DataJwt);
    response.status(200).json(userProps);
});
routerUser.post("/user", controllerUserCreate_1.ControllerUserCreate, (request, response) => {
    response.status(201).json({});
});
routerUser.post("/forgout", controllerUserForgout_1.ControllerUserForgout, (request, response) => {
    response.status(201).json({});
});
routerUser.patch("/user", authUser_1.AuthUser, controllerUserUpdate_1.ControllerUserUpdate, (request, response) => {
    response.status(204).json({});
});
routerUser.delete("/user", authUser_1.AuthUser, controllerUserDelete_1.ControllerUserDelete, (request, response) => {
    response.status(204).json({});
});

import { Router } from "express";
import { ControllerUserCreate } from "../../controller/controllerUser/controllerUserCreate";
import { ControllerUserUpdate } from "../../controller/controllerUser/controllerUserUpdate";
import { ControllerUserDelete } from "../../controller/controllerUser/controllerUserDelete";
import { ControllerUserSelectAll } from "../../controller/controllerUser/controllerUserSelectAll";
import { AuthUser } from "../../Auth/authUser";
import { AuthAdmin } from "../../Auth/authAdmin";
import { ControllerUserForgout } from "../../controller/controllerUser/controllerUserForgout";
import { ControllerUserChangePass } from "../../controller/controllerUser/controlerUserChangePass";
const routerUser = Router();
routerUser.get("/user", AuthAdmin, ControllerUserSelectAll, (request, response) => {
    const userProps = request.body.DataUser;
    // response.status(200).json(request.body.DataJwt);
    response.status(200).json(userProps);
});
routerUser.post("/user", ControllerUserCreate, (request, response) => {
    response.status(201).json({});
});
routerUser.post("/forgout", ControllerUserForgout, (request, response) => {
    response.status(200).json({});
});
routerUser.post("/changePass", ControllerUserChangePass, (request, response) => {
    //forgoutToken
    response.status(201).json({});
});
routerUser.patch("/user", AuthUser, ControllerUserUpdate, (request, response) => {
    response.status(204).json({});
});
routerUser.delete("/user", AuthUser, ControllerUserDelete, (request, response) => {
    response.status(204).json({});
});
export { routerUser };

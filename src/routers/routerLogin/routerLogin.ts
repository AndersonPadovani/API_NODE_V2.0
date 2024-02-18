import { Request, Response, Router } from "express";
import { ControllerUserCreate } from "../../controller/controllerUser/controllerUserCreate";
import { ControllerUserUpdate } from "../../controller/controllerUser/controllerUserUpdate";
import { ControllerUserDelete } from "../../controller/controllerUser/controllerUserDelete";
import { ControllerUserSelectAll } from "../../controller/controllerUser/controllerUserSelectAll";
import { authUserPropsType } from "../../model/modelUser/user";
import { AuthAdmin } from "../../Auth/authAdmin";
import { ControllerLoginEmail } from "../../controller/controllerLogin/controllerEmailLogin";
import { ControllerLoginPhone } from "../../controller/controllerLogin/controllerPhoneLogin";

const routerLogin = Router();

routerLogin.post(
    "/login/email",
    ControllerLoginEmail,
    (request: Request, response: Response) => {
        response.status(200).json(request.body.AuthPropr);
    }
);

routerLogin.post(
    "/login/phone",
    ControllerLoginPhone,
    (request: Request, response: Response) => {
        response.status(200).json(request.body.AuthPropr);
    }
);

export { routerLogin };

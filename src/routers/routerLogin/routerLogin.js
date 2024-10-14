import { Router } from "express";
import { ControllerLoginEmail } from "../../controller/controllerLogin/controllerEmailLogin";
import { ControllerLoginPhone } from "../../controller/controllerLogin/controllerPhoneLogin";
const routerLogin = Router();
routerLogin.post("/login/email", ControllerLoginEmail, (request, response) => {
    response.status(200).json(request.body.AuthPropr);
});
routerLogin.post("/login/phone", ControllerLoginPhone, (request, response) => {
    response.status(200).json(request.body.AuthPropr);
});
export { routerLogin };

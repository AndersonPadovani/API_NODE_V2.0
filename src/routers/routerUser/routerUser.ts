import { Request, Response, Router } from "express";
import { ControllerUserCreate } from "../../controller/controllerUser/controllerUserCreate";
import { ControllerUserUpdate } from "../../controller/controllerUser/controllerUserUpdate";
import { ControllerUserDelete } from "../../controller/controllerUser/controllerUserDelete";
import { ControllerUserSelectAll } from "../../controller/controllerUser/controllerUserSelectAll";
import { AuthUser } from "../../Auth/authUser";
import { authUserPropsType } from "../../model/modelUser/user";
import { AuthAdmin } from "../../Auth/authAdmin";

const routerUser = Router();

routerUser.get(
    "/user",
    AuthAdmin,
    ControllerUserSelectAll,
    (request: Request, response: Response) => {
        const userProps = request.body.DataUser as authUserPropsType;
        // response.status(200).json(request.body.DataJwt);
        response.status(200).json(userProps);
    }
);

routerUser.post(
    "/user",
    ControllerUserCreate,
    (request: Request, response: Response) => {
        response.status(201).json({});
    }
);

routerUser.patch(
    "/user",
    AuthUser,
    ControllerUserUpdate,
    (request: Request, response: Response) => {
        response.status(204).json({});
    }
);

routerUser.delete(
    "/user",
    AuthUser,
    ControllerUserDelete,
    (request: Request, response: Response) => {
        response.status(204).json({});
    }
);

export { routerUser };

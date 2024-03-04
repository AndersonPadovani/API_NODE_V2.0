"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerUserForgout = void 0;
const midForgoutByEmail_1 = require("../../middleware/midUser/midUserForgout/midForgoutByEmail");
const entityUser_1 = require("../../entity/user/entityUser");
const ApiError_1 = require("../../utils/ApiError");
const authJwt_1 = require("../../Auth/authJwt");
const controllerSendEmail_1 = require("../controllerSendEmail/controllerSendEmail");
async function ControllerUserForgout(request, response, next) {
    const { email } = request.body;
    await (0, midForgoutByEmail_1.MidForgoutByEmail)({ email });
    const user = new entityUser_1.User();
    const validateEmail = await user.SelectByEmail(email);
    if (!validateEmail) {
        throw new ApiError_1.NotFound(`${email} não cadastrado no sistema!`);
    }
    const jwtForgoutCreate = await (0, authJwt_1.CreateJwtResePass)({
        id: validateEmail.id,
        email: validateEmail.email,
    });
    const forgoutLink = `${process.env.BASE_URL_FRONT_END}/change_pass?forgoutToken=${jwtForgoutCreate}`;
    const sendEmail = new controllerSendEmail_1.ControllerSendEmail();
    await sendEmail.Send(email, forgoutLink);
    next();
}
exports.ControllerUserForgout = ControllerUserForgout;

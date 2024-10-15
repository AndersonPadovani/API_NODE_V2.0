"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerUserForgout = ControllerUserForgout;
const midForgoutByEmail_1 = require("../../middleware/midUser/midUserForgout/midForgoutByEmail");
const entityUser_1 = require("../../entity/user/entityUser");
const ApiError_1 = require("../../utils/ApiError");
const authJwt_1 = require("../../Auth/authJwt");
const controllerSendEmail_1 = require("../controllerSendEmail/controllerSendEmail");
const jwtToken_1 = require("../../entity/jwtToken/jwtToken");
async function ControllerUserForgout(request, response, next) {
    const { email } = request.body;
    await (0, midForgoutByEmail_1.MidForgoutByEmail)({ email });
    const user = new entityUser_1.User();
    const jwt = new jwtToken_1.JwtToken();
    const validateEmail = await user.SelectByEmail(email);
    if (!validateEmail) {
        throw new ApiError_1.NotFound(`${email} não cadastrado no sistema!`);
    }
    const validateTimeNewEmail = await jwt.SelectByUid(validateEmail.id);
    if (validateTimeNewEmail) {
        const now = new Date(); // Data atual
        // Converter createdAt para um objeto Date, se ainda não for
        const createdAt = new Date(validateTimeNewEmail.createdAt);
        if (isNaN(createdAt.getTime())) {
            throw new Error("Data inválida"); // Valida se a data é inválida
        }
        // Calcula a diferença em milissegundos
        const differenceInMilliseconds = now.getTime() - createdAt.getTime();
        const differenceInMinutes = Math.floor(differenceInMilliseconds / 1000 / 60);
        const maxDifference = 30; // Tempo máximo permitido para enviar outro email de recuperação (em minutos)
        if (differenceInMinutes < maxDifference) {
            throw new ApiError_1.BadRequest(`Aguarde ${maxDifference - differenceInMinutes} minutos antes de solicitar um novo email de recuperação.`);
        }
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

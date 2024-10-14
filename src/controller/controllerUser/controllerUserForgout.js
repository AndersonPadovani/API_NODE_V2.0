import { MidForgoutByEmail } from "../../middleware/midUser/midUserForgout/midForgoutByEmail";
import { User } from "../../entity/user/entityUser";
import { NotFound } from "../../utils/ApiError";
import { CreateJwtResePass } from "../../Auth/authJwt";
import { ControllerSendEmail } from "../controllerSendEmail/controllerSendEmail";
export async function ControllerUserForgout(request, response, next) {
    const { email } = request.body;
    await MidForgoutByEmail({ email });
    const user = new User();
    const validateEmail = await user.SelectByEmail(email);
    if (!validateEmail) {
        throw new NotFound(`${email} não cadastrado no sistema!`);
    }
    const jwtForgoutCreate = await CreateJwtResePass({
        id: validateEmail.id,
        email: validateEmail.email,
    });
    const forgoutLink = `${process.env.BASE_URL_FRONT_END}/change_pass?forgoutToken=${jwtForgoutCreate}`;
    const sendEmail = new ControllerSendEmail();
    await sendEmail.Send(email, forgoutLink);
    next();
}

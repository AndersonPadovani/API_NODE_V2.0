import { ForgoutPassByEmail } from "../../../model/modelUser/user";
import { BadRequest } from "../../../utils/ApiError";
import { validateUserForgoutByEmailSchema } from "./validateUserForgoutByEmailSchema";

export async function MidForgoutByEmail(userProps: ForgoutPassByEmail) {
    const validateEmail = await validateUserForgoutByEmailSchema
        .validate(userProps)
        .catch((error) => {
            throw new BadRequest(error.message);
        });
    return validateEmail;
}

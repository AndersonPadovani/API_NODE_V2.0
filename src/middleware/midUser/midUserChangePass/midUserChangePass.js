import { BadRequest } from "../../../utils/ApiError";
import { validateUserChangePassSchema } from "./validateUserForgoutByEmailSchema";
export async function MidForgoutChangePass(userProps) {
    const validatePass = await validateUserChangePassSchema
        .validate(userProps)
        .catch((error) => {
        throw new BadRequest(error.message);
    });
    return validatePass;
}

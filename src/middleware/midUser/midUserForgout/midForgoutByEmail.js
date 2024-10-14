import { BadRequest } from "../../../utils/ApiError";
import { validateUserForgoutByEmailSchema } from "./validateUserForgoutByEmailSchema";
export async function MidForgoutByEmail(userProps) {
    const validateEmail = await validateUserForgoutByEmailSchema
        .validate(userProps)
        .catch((error) => {
        throw new BadRequest(error.message);
    });
    return validateEmail;
}

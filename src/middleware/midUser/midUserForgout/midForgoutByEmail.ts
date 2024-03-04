import { ForgoutPassByEmailType } from "../../../model/modelUser/user";
import { BadRequest } from "../../../utils/ApiError";
import { validateUserForgoutByEmailSchema } from "./validateUserForgoutByEmailSchema";

export async function MidForgoutByEmail(userProps: ForgoutPassByEmailType) {
    const validateEmail = await validateUserForgoutByEmailSchema
        .validate(userProps)
        .catch((error) => {
            throw new BadRequest(error.message);
        });
    return validateEmail;
}

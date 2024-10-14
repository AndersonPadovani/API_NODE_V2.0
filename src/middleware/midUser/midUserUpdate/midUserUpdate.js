import { BadRequest } from "../../../utils/ApiError";
import { validateUserUpdateSchema } from "./validateUserUpdateSchema";
export async function MidUserUpdate(userProps) {
    const validateUserUpdate = await validateUserUpdateSchema
        .validate(userProps)
        .catch((error) => {
        throw new BadRequest(error.message);
    });
    return validateUserUpdate;
}

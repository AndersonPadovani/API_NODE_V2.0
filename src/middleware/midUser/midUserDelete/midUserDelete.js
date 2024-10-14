import { BadRequest } from "../../../utils/ApiError";
import { validateUserDeleteSchema } from "./validateUserDeleteSchema";
export async function MidUserDelete(userProps) {
    const validateUserDelete = await validateUserDeleteSchema
        .validate(userProps)
        .catch((error) => {
        throw new BadRequest(error.message);
    });
    return validateUserDelete;
}

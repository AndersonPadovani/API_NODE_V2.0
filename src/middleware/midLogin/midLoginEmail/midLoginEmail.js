import { BadRequest } from "../../../utils/ApiError";
import { validateLoginEmailSchema } from "./validateLoginEmailSchema";
export async function MidLoginEmail(userProps) {
    const validateLoginEmail = await validateLoginEmailSchema
        .validate(userProps)
        .catch((error) => {
        throw new BadRequest(error.message);
    });
    return validateLoginEmail;
}

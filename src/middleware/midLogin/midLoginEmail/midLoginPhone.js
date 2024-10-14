import { BadRequest } from "../../../utils/ApiError";
import { validateLoginPhoneSchema } from "./validateLoginPhoneSchema";
export async function MidLoginPhone(userProps) {
    const validateLoginPhone = await validateLoginPhoneSchema
        .validate(userProps)
        .catch((error) => {
        throw new BadRequest(error.message);
    });
    return validateLoginPhone;
}

import { LoginEmailType } from "../../../model/modelLogin/modelLogin";
import { BadRequest } from "../../../utils/ApiError";
import { validateLoginEmailSchema } from "./validateLoginEmailSchema";

export async function MidLoginEmail(userProps: LoginEmailType) {
    const validateLoginEmail = await validateLoginEmailSchema
        .validate(userProps)
        .catch((error) => {
            throw new BadRequest(error.message);
        });
    return validateLoginEmail;
}

import { CreateUserType } from "../../../model/modelUser/user";
import { validateUserCreateSchema } from "./validateUserCreateSchema";
import { BadRequest } from "../../../utils/ApiError";

export async function MidUserCreate(userProps: CreateUserType) {
    const validUserCreate = await validateUserCreateSchema
        .validate(userProps)
        .catch((error) => {
            throw new BadRequest(error.message);
        });

    return validUserCreate;
}

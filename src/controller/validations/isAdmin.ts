import { User } from "../../entity/user/entityUser";
import { Unautorized } from "../../utils/ApiError";

export async function IsAdmin(id: string) {
    const user = new User();
    const resp = await user.SelectById(id);

    if (!resp) {
        throw new Unautorized("Usuario sem privilegios administrativos");
    }

    return resp;
}

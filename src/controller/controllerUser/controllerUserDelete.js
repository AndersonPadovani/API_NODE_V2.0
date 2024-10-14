import { MidUserDelete } from "../../middleware/midUser/midUserDelete/midUserDelete";
import { User } from "../../entity/user/entityUser";
import { ValidateUserDeleteById } from "../validations/selectById";
export async function ControllerUserDelete(request, response, next) {
    const { id } = request.body.authUserProps;
    await MidUserDelete({ id });
    await ValidateUserDeleteById(id);
    const user = new User();
    user.Delete(id);
    next();
}

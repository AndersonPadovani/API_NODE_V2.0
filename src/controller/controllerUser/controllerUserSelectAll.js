import { User } from "../../entity/user/entityUser";
export async function ControllerUserSelectAll(request, response, next) {
    const user = new User();
    const usersProps = await user.selectAllUser();
    request.body.DataUser = usersProps;
    next();
}

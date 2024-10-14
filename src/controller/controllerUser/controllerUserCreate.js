import { MidUserCreate } from "../../middleware/midUser/midUserCreate/midUserCreate";
import { PasswordEncript } from "../../utils/PasswordEncript";
import { User } from "../../entity/user/entityUser";
import { ValidateUserEmailDuplicate } from "../validations/emailDuplicate";
import { ValidateUserPhoneDuplicate } from "../validations/phoneDuplicate";
export async function ControllerUserCreate(request, response, next) {
    const { name, email, phone, password: pass, } = request.body;
    let password = pass;
    await MidUserCreate({ name, email, phone, password });
    password = PasswordEncript(pass);
    await ValidateUserEmailDuplicate(email);
    await ValidateUserPhoneDuplicate(phone);
    const user = new User();
    user.Create({ name, email, phone, password });
    next();
}

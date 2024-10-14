import {
  ForgoutPassByEmailType,
  ForgoutTokenType,
} from "../../../model/modelUser/user";
import { BadRequest } from "../../../utils/ApiError";
import { validateUserChangePassSchema } from "./validateUserForgoutByEmailSchema";

export async function MidForgoutChangePass(userProps: ForgoutTokenType) {
  const validatePass = await validateUserChangePassSchema
    .validate(userProps)
    .catch((error) => {
      throw new BadRequest(error.message);
    });
  return validatePass;
}

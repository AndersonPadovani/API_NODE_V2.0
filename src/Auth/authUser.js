import { BadRequest } from "../utils/ApiError";
import { ValidateJwtToken } from "./authJwt";
export async function AuthUser(request, response, next) {
    const authorization = request.headers.authorization;
    if (!authorization) {
        throw new BadRequest("Bearer Token não informado!");
    }
    const [, token] = authorization.split(" ");
    const { PAYLOAD } = await ValidateJwtToken(token);
    request.body.authUserProps = PAYLOAD;
    next();
}

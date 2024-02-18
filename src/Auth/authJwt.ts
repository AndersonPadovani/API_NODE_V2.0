import Jwt from "jsonwebtoken";
import { Unautorized } from "../utils/ApiError";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function CreateJwt(payload: any): Promise<string> {
    const { password, ...PAYLOAD } = payload;
    return Jwt.sign({ PAYLOAD }, process.env.JWT_PASSWORD!, {
        expiresIn: "1H",
    });
}

export async function ValidateJwtToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
        Jwt.verify(token, process.env.JWT_PASSWORD!, (err, decode) => {
            if (err) {
                throw new Unautorized(err.message);
            }

            resolve(decode);
        });
    });
}

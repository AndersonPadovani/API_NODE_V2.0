import Jwt from "jsonwebtoken";
import { Unautorized } from "../utils/ApiError";
import { JwtToken } from "../entity/jwtToken/jwtToken";

type PAYLOADType = {
  id: string;
  email: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function CreateJwt(payload: any): Promise<string> {
  const { password, ...PAYLOAD } = payload;
  return Jwt.sign({ PAYLOAD }, process.env.JWT_PASSWORD!, {
    expiresIn: "1H",
  });
}

export async function ValidateJwtToken(token: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    Jwt.verify(token, process.env.JWT_PASSWORD!, async (err, decode) => {
      if (err) {
        reject(err.message);
      }

      resolve(decode);
    });
  });
}

export async function CreateJwtResePass(PAYLOAD: PAYLOADType) {
  // ID exclusivo para o token
  const jti = Math.random().toString(36).substring(7);

  // Expiração em 5 minutos (ajuste conforme necessário)
  const expiracao = Math.floor(Date.now() / 1000) + 300;

  const data = {
    jti: jti,
    exp: expiracao,
    PAYLOAD,
  };
  const token = Jwt.sign(data, process.env.JWT_PASSWORD!);

  if (token) {
    const jwtSave = new JwtToken();
    const validate = await jwtSave.Select(jti);

    if (validate) {
      throw new Unautorized("Jwt já cadastrado!");
    }
    await jwtSave.Save({ jti, uId: PAYLOAD.id });
  }

  return token;
}

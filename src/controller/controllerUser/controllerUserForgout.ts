import { NextFunction, Request, Response } from "express";
import { ForgoutPassByEmailType } from "../../model/modelUser/user";
import { MidForgoutByEmail } from "../../middleware/midUser/midUserForgout/midForgoutByEmail";
import { User } from "../../entity/user/entityUser";
import { BadRequest, NotFound } from "../../utils/ApiError";
import { CreateJwtResePass } from "../../Auth/authJwt";

import { ControllerSendEmail } from "../controllerSendEmail/controllerSendEmail";
import { JwtToken } from "../../entity/jwtToken/jwtToken";

export async function ControllerUserForgout(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { email } = request.body as ForgoutPassByEmailType;

  await MidForgoutByEmail({ email });

  const user = new User();
  const jwt = new JwtToken();

  const validateEmail = await user.SelectByEmail(email);

  if (!validateEmail) {
    throw new NotFound(`${email} não cadastrado no sistema!`);
  }

  const validateTimeNewEmail = await jwt.SelectByUid(validateEmail.id);

  if (validateTimeNewEmail) {
    const now = new Date(); // Data atual

    // Converter createdAt para um objeto Date, se ainda não for
    const createdAt = new Date(validateTimeNewEmail.createdAt);

    if (isNaN(createdAt.getTime())) {
      throw new Error("Data inválida"); // Valida se a data é inválida
    }

    // Calcula a diferença em milissegundos
    const differenceInMilliseconds = now.getTime() - createdAt.getTime();
    const differenceInMinutes = Math.floor(
      differenceInMilliseconds / 1000 / 60
    );

    const maxDifference = 30; // Tempo máximo permitido para enviar outro email de recuperação (em minutos)

    if (differenceInMinutes < maxDifference) {
      throw new BadRequest(
        `Aguarde ${
          maxDifference - differenceInMinutes
        } minutos antes de solicitar um novo email de recuperação.`
      );
    }
  }
  const jwtForgoutCreate = await CreateJwtResePass({
    id: validateEmail.id,
    email: validateEmail.email,
  });

  const forgoutLink = `${process.env.BASE_URL_FRONT_END}/change_pass?forgoutToken=${jwtForgoutCreate}`;

  const sendEmail = new ControllerSendEmail();
  await sendEmail.Send(email, forgoutLink);

  next();
}

import * as SendEmail from "nodemailer";
import { BadRequest } from "../../utils/ApiError";
export class ControllerSendEmail {
    transporter;
    constructor() {
        this.transporter = SendEmail.createTransport({
            service: "hotmail",
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: process.env.SMTP_USER_EMAIL,
                pass: `${process.env.SMTP_USER_PASS}`,
            },
            tls: {
                ciphers: "SSLv3",
            },
        });
    }
    async Send(email, link) {
        await this.transporter
            .sendMail({
            from: process.env.SMTP_USER_EMAIL, // sender address
            to: email, // list of receivers
            subject: "✔ Forgout you password", // Subject line
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Recuperação de Senha</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  width: 100%;
                  max-width: 600px;
                  margin: auto;
                  padding: 20px;
                  text-align: center;
                }
                .button {
                  display: inline-block;
                  padding: 15px 30px;
                  font-size: 16px;
                  text-align: center;
                  text-decoration: none;
                  color: #ffffff;
                  background-color: #4caf50;
                  border-radius: 5px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h2>Recuperação de Senha</h2>
                <p>Você solicitou a recuperação de senha. Clique no botão abaixo para redefinir sua senha:</p>
                <a href="${link}" class="button">Redefinir Senha</a>
              </div>
            </body>
            </html>`, // html body
        })
            .then((resp) => {
            return true;
        })
            .catch((error) => {
            throw new BadRequest("Falha ao enviar email de recuperação, tente novamente mais tardes!");
        });
    }
}

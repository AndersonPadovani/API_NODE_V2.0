"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerSendEmail = void 0;
const NodeMailer = __importStar(require("nodemailer"));
const ApiError_1 = require("../../utils/ApiError");
class ControllerSendEmail {
    constructor() {
        this.transporter = NodeMailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASS,
            },
        });
    }
    async Send(email, link) {
        await this.transporter
            .sendMail({
            from: process.env.SMTP_EMAIL, // sender address
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
            throw new ApiError_1.BadRequest("Falha ao enviar email de recuperação, tente novamente mais tardes!\n" +
                error);
        });
    }
}
exports.ControllerSendEmail = ControllerSendEmail;

import { object, string } from "yup";

export const validateLoginPhoneSchema = object({
    phone: string()
        .required("Prenecha o campo Telefone!")
        .length(16, "Telefone inserido esta invalido!"),
    password: string()
        .required("Preencha o campo Senha!")
        .min(4, "Sua Senha deve conter pelomenos 4 caracteres!"),
});

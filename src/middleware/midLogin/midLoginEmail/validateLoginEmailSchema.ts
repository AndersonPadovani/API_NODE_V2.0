import { object, string } from "yup";

export const validateLoginEmailSchema = object({
    email: string().required("Preencha o campo Email!").email(),
    password: string()
        .required("Preencha o campo Senha!")
        .min(4, "Sua Senha deve conter pelomenos 4 caracteres!"),
});

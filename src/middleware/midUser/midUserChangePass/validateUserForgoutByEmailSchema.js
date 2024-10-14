import { object, string } from "yup";
export const validateUserChangePassSchema = object({
    forgoutToken: string().required().min(10),
    password: string()
        .required("Preencha o campo Senha!")
        .min(4, "Sua Senha deve conter pelomenos 4 caracteres!"),
});

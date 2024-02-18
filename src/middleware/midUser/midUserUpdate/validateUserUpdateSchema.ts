import { number, object, string } from "yup";

export const validateUserUpdateSchema = object({
    name: string()
        .required("Preencha o campo Nome!")
        .min(4, "O Nome deve conter no minimo 4 letras!"),
    email: string().required("Preencha o campo Email!").email(),
    phone: string()
        .required("Prenecha o campo Telefone!")
        .length(16, "Telefone inserido esta invalido!"),
    password: string()
        .required("Preencha o campo Senha!")
        .min(4, "Sua Senha deve conter pelomenos 4 caracteres!"),
    level: number().required(),
});

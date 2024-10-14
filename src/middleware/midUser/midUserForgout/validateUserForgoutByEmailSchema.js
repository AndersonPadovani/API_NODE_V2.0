import { object, string } from "yup";
export const validateUserForgoutByEmailSchema = object({
    email: string().required("Preencha o campo Email!").email(),
});

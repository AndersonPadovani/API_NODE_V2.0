import { object, string } from "yup";

export const validateUserDeleteSchema = object({
    id: string()
        .uuid("Id inserido no formato invalido!")
        .required("Id usuario invalido!"),
});

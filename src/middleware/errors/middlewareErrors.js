export const MidErrorsApi = (error, request, response, next) => {
    const stsCode = error.statusCode ?? 500;
    // const msgErro = error.statusCode ? error.message : "Internal Server Error!";
    const msgErro = error.statusCode
        ? error.message
        : "Internal Server Error: " + error.message;
    response.status(stsCode).json({ message: msgErro });
};

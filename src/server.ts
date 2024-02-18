import "express-async-errors";
import express from "express";
import * as Routers from "./routers/routers";
import "dotenv/config";
import { MidErrorsApi } from "./middleware/errors/middlewareErrors";

const PORT = process.env.SERVER_PORT || 5000;

const App = express();

App.use(express.json());

App.use(Routers.appRouter);

App.use(MidErrorsApi);

App.listen(PORT || 3000, () => {
    console.log(`###  Servidor On http://localhost:${PORT} ###`);
});

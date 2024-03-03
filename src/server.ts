import "express-async-errors";
import express from "express";
import * as Routers from "./routers/routers";
import "dotenv/config";
import { MidErrorsApi } from "./middleware/errors/middlewareErrors";

const PORT = process.env.SERVER_PORT || 5000;

const App = express();

App.use(express.json());

App.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

App.use(Routers.appRouter);

App.use(MidErrorsApi);

App.listen(PORT || 3000, () => {
    console.log(`###  Servidor On http://localhost:${PORT} ###`);
});

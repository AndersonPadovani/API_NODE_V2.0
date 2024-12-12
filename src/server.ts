import "express-async-errors";
import express from "express";
import * as Routers from "./routers/routers";
import "dotenv/config";
import { MidErrorsApi } from "./middleware/errors/middlewareErrors";

const allowedOrigins = [
  "http://localhost:3000",
  "https://login-navy-ten.vercel.app",
  "*",
];

const PORT = process.env.SERVER_PORT || 5000;

const App = express();

App.use(express.json());

App.use((req, res, next) => {
  const origin = req.headers.origin;

  // Verifica se a origem da requisição está na lista de origens permitidas
  if (allowedOrigins.includes(`${origin}`)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  next();
});

App.use(Routers.appRouter);

App.use(MidErrorsApi);

App.listen(PORT || 3000, () => {
  console.log(`###  Servidor On http://localhost:${PORT} ###`);
});

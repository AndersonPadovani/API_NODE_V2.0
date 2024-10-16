"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const Routers = __importStar(require("./routers/routers"));
require("dotenv/config");
const middlewareErrors_1 = require("./middleware/errors/middlewareErrors");
const allowedOrigins = [
    "http://localhost:3000",
    "https://login-beta-plum.vercel.app",
];
const PORT = process.env.SERVER_PORT || 5000;
const App = (0, express_1.default)();
App.use(express_1.default.json());
App.use((req, res, next) => {
    const origin = req.headers.origin;
    // Verifica se a origem da requisição está na lista de origens permitidas
    if (allowedOrigins.includes(`${origin}`)) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
App.use(Routers.appRouter);
App.use(middlewareErrors_1.MidErrorsApi);
App.listen(PORT || 3000, () => {
    console.log(`###  Servidor On http://localhost:${PORT} ###`);
});

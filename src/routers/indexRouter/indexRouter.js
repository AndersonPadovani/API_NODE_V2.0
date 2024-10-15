"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const express_1 = require("express");
const appRouter = (0, express_1.Router)();
exports.appRouter = appRouter;
appRouter.get("/", (req, res) => {
    res.status(200).json({
        mode: process.env.API_MODE,
        name: process.env.API_NAME,
        version: process.env.API_VERSION,
        status: process.env.API_STATUS,
        author: process.env.API_AUTHOR,
        contact: process.env.API_CONTACT,
    });
});

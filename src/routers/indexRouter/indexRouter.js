import { Router } from "express";
const appRouter = Router();
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
export { appRouter };

import { Router } from "express";
import * as Index from "./indexRouter/indexRouter";
import * as User from "./routerUser/routerUser";
import * as Login from "./routerLogin/routerLogin";
const appRouter = Router();
appRouter.use(Index.appRouter);
appRouter.use(User.routerUser);
appRouter.use(Login.routerLogin);
export { appRouter };

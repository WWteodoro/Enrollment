import express from "express"
import { mainRouter } from "./mainRoute"
import { userAuthenticateRoute } from "./authRoute";
import { userRoute } from "./userRoute";

export const route = express.Router();

route.use('/', mainRouter);
route.use('/user', userRoute);
route.use('/auth', userAuthenticateRoute);
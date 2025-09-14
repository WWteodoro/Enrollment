import express from "express"
import { mainRouter } from "./mainRoute"
import { userAuthenticateRoute } from "./authRoute";
import { userRoute } from "./userRoute";
import { courseRoute } from "./courseRoute";
import { enrollmentRoute } from "./enrollmentRoute";

export const route = express.Router();

route.use('/', mainRouter);
route.use('/user', userRoute);
route.use('/auth', userAuthenticateRoute);
route.use('/courses', courseRoute);
route.use('/enrollment', enrollmentRoute);
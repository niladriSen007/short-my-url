import { Router } from "express";
import urlRouter from "./url/url.router"

const v1Router = Router();

v1Router.use("/url", urlRouter)

export default v1Router;
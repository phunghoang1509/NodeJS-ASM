import { Router } from "express";
import { SignIn, SignUp } from "../controllers/auth";

const routerAuth = Router()
routerAuth.post("/signup", SignUp)
routerAuth.post("/signin", SignIn)
export default routerAuth
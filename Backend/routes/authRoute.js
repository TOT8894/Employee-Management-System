import { Router } from "express";
import { authentication } from "../middleware/authentication.js";
import {
  signIn,
  signUp,
  signOut,
  refreshToken,
  getUser
} from "../controllers/authController.js";
const authRoute = Router();
authRoute.get("/profile", authentication, getUser);
authRoute.post("/sign-up", signUp);
authRoute.post("/sign-in", signIn);
authRoute.post("/sign-out", authentication, signOut);
authRoute.post("/refresh-token", refreshToken);
export default authRoute;
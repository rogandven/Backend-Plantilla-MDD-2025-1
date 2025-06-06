import { Router } from "express"
import { login, register, isAdminFunction } from "../controllers/auth.controller.js"
import { isAdmin } from "../middleware/authorization.middleware.js";
import { authenticateJwt } from "../middleware/authentication.middleware.js";

const router = new Router();

router.post("/register", register);
router.post("/login", login);

router.use(authenticateJwt);

router.get("/admin", isAdmin, isAdminFunction);

export default router;
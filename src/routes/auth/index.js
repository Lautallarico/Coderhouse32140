import { Router } from "express";
import passport from "passport";
import { AuthControllers } from "../../controllers/index.js";

const router = Router()

router.post('/login', passport.authenticate('login', { session: false }), AuthControllers.login)
router.post('/signup', AuthControllers.signUp)
router.delete('/:id', AuthControllers.deleteUser)


export { router as AuthRouter }
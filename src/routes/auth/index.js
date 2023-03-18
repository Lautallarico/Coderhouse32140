import { Router } from "express";
import passport from "passport";
import { AuthControllers } from "../../controllers/index.js";
import { IncorrectRoute } from "../../middlewares/index.js";

const router = Router()

router.post('/login', passport.authenticate('login', { session: true }))
router.post('/signup', AuthControllers.signUp)

//GITHUB
router.get('/github-login', passport.authenticate('github'))
router.get('/github', passport.authenticate('github'), AuthControllers.githubUser)

router.get('*', IncorrectRoute.errorRoutes)

export { router as AuthRouter }
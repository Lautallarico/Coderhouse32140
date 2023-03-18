import { Router } from "express"
import { RandomsControllers } from "../../controllers/index.js"
import { IncorrectRoute } from "../../middlewares/index.js"


const router = Router()

router.get('/', RandomsControllers.randoms)
router.get('*', IncorrectRoute.errorRoutes)


export { router as RandomRouter }

import { Router } from 'express'
import { Authentications, IncorrectRoute } from '../../middlewares/index.js'
import { ProductController } from '../../controllers/index.js'


const router = Router()

router.get('/', ProductController.getAll)
router.post('/create-product', Authentications.verifyRole, ProductController.createProduct)
router.get('/:id', ProductController.getById)
router.delete('/:id', ProductController.deleteProduct)
// router.get('*', IncorrectRoute.errorRoutes)

export { router as ProductRouter }
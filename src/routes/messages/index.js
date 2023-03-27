import { Router } from "express"
import { MessageController } from "../../controllers/index.js"

const router = Router()

router.post('/', MessageController.saveMessages)
router.get('/', MessageController.getAllMessages)
router.get('/:id', MessageController.getMessagesById)


export { router as MessageRouter }
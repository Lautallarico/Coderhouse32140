import { Router } from "express"
import { ChatController } from "../../controllers/index.js"

const router = Router()

router.post('/', ChatController.saveChat)
router.post('/:chatId/messages', ChatController.updatedChatById)
// router.delete('/:cartId', CartController.deleteCart)
// router.delete('/:cartId/products/:id_prod', CartController.deleteProductFromCart)
router.get('/:chatId/messages', ChatController.messagesInChat)
router.get('/:id', ChatController.chatById)
// router.get('/:id/buyCart', CartController.buyCart)


export { router as ChatRouter }
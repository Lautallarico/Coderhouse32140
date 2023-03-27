import { Router } from "express"
import { ChatController } from "../../controllers/index.js"

const router = Router()

router.post('/', ChatController.saveChat)
router.post('/:chatId/messages', ChatController.updatedChatById)
router.get('/:chatId/messages', ChatController.messagesInChat)
router.get('/:id', ChatController.chatById)



export { router as ChatRouter }
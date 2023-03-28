import { MessagesDao } from "../../dao/index.js"
import { DATE_UTILS, JOI_VALIDATOR, ERRORS_UTILS } from "../../utils/index.js"
import logger from "../../loggers/loggers.js"


const getAllMessages = async (req, res) => {
    try {

        const allMesagges = await MessagesDao.getAllMessages()
        const messageResponse = allMesagges.map(msg => msg.text)
        res.status(200).send({ success: true, data: messageResponse })

    } catch (error) {

        logger.error('error desde el getAllMessages: ' + error)
        res.status(404).send({ success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_MESSAGE })

    }
}

const getMessagesById = async (req, res) => {
    try {

        const { id } = req.params
        const message = await MessagesDao.getMessageById(id)

        if (!message) {
            return res.status(404).send({ success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_MESSAGE })
        }

        const messageResponse = message.text

        res.status(200).send({ success: true, data: messageResponse, message: "Mensaje localizado" })

    } catch (error) {
        logger.error('error desde el getMessagesById: ' + error)
        res.status(404).send({ success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_MESSAGE })
    }
}

const saveMessages = async (req, res) => {
    try {

        const { text } = req.body
        const newMessage = await JOI_VALIDATOR.message.validateAsync({ text, timestamp: DATE_UTILS.getTimestamp() })
        const savedMessage = await MessagesDao.saveMessage(newMessage)

        res.status(200).send({ success: true, data: savedMessage, message: 'Mensaje guardado con exito' })

    } catch (error) {

        logger.error(error, `error from createProduct`);
        res.status(400).send({ success: false, data: undefined, message: "No pudimos envair el mensaje" })
    }
}

export const MessageController = { getAllMessages, getMessagesById, saveMessages }
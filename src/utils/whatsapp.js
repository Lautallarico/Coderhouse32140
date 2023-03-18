import twilio from 'twilio'
import { config } from '../config/index.js'
import logger from '../loggers/loggers.js'

const user = config.TWILIO.ACCOUNT_SID
const pass = config.TWILIO.AUTH_TOKEN
const whatsappServer = config.TWILIO.NUMBER
const whatsappAdmin = config.TWILIO.ADMIN_NUMBER

const client = twilio(user, pass)

const whatsappConfig = async (options) => {
    try {
        const message = await client.messages.create({
            body: options.body,
            from: whatsappServer, 
            to: whatsappAdmin 
        })


    } catch (error) {
        console.log('error from sendWhatsapp', error);
        logger.error('error from sendWhatsapp', error)
    }
}

export const SEND_WHATSAPP = { whatsappConfig }
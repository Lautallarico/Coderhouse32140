import { ContainerMongoDB } from "../../container/index.js";
import { MessagesModel } from "../../models/index.js";
import logger from '../../loggers/loggers.js'

export class MessagesMongo extends ContainerMongoDB {

    static getInstance() {
        return new MessagesMongo()
    }

    constructor() {

        if (typeof MessagesMongo.instance === 'object') {
            return MessagesMongo.instance
        }


        super({
            name: MessagesModel.MessageCollection,
            schema: MessagesModel.MessageSchema,
        });

        MessagesMongo.instance = this
        return this
    }

    async getAllMessages() {
        try {
            return await super.getAll()
        } catch (error) {
            logger.error(`error in getAllMessages-MessagesMongo - Error: `, error)
        }
    }

    async saveMessage(element) {
        try {
            return await super.save(element)
        } catch (error) {
            logger.error(`error in saveMessage-MessagesMongo - Error: `, error)
        }
    }

    async getMessageById(id) {
        try {
            return await super.getById(id)
        } catch (error) {
            logger.error(`error in getMessageById-MessagesMongo - Error: `, error)
        }
    }

}
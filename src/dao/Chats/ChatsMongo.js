import { ContainerMongoDB } from "../../container/index.js";
import { ChatModel } from "../../models/index.js";
import logger from '../../loggers/loggers.js'

export class ChatsMongo extends ContainerMongoDB {

    static getInstance() {
        return new ChatsMongo()
    }

    constructor() {

        if (typeof ChatsMongo.instance === 'object') {
            return ChatsMongo.instance
        }

        super({
            name: ChatModel.ChatCollection,
            schema: ChatModel.ChatSchema
        });

        ChatsMongo.instance = this
        return this
    }

    async saveChat(element) {
        try {
            return await super.save(element)
        } catch (error) {
            logger.error(`error in saveChat-ChatsMongo - Error: `, error)
        }
    }

    async getChatById(id) {
        try {
            return await super.getById(id)
        } catch (error) {
            logger.error(`error in getChatById-ChatsMongo - Error: `, error)
        }
    }

    async updateChatById(id, newData) {
        try {
            return await super.updateById(id, newData)
        } catch (error) {
            logger.error(`error in updateChatById-ChatsMongo - Error: `, error)
        }
    }

}
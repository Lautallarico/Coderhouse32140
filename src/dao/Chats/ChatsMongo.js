import { ContainerMongoDB } from "../../container/index.js";
import { ChatModel } from "../../models/index.js";
// import logger from '../../loggers/loggers.js'

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

    // async getCartById(id) {
    //     try {
    //         return await this.model.findById(id).populate('products')
    //     } catch (error) {
    //         logger.error(`error in getCartById-CartsMongo - Error: `, error)
    //     }
    // }

    // async getAllCarts() {
    //     try {
    //         return await super.getAll()
    //     } catch (error) {
    //         logger.error(`error in getAllCarts-CartsMongo - Error: `, error)
    //     }
    // }

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

    // async deleteCartById(id) {
    //     try {
    //         return await super.deleteById(id)
    //     } catch (error) {
    //         logger.error(`error in deleteCartById-CartsMongo - Error: `, error)
    //     }
    // }
}
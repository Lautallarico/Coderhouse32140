import { ContainerMongoDB } from "../../container/index.js";
import { CartModel } from "../../models/index.js";
import logger from '../../loggers/loggers.js'

export class CartsMongo extends ContainerMongoDB {

    static getInstance() {
        return new CartsMongo()
    }

    constructor() {

        if (typeof CartsMongo.instance === 'object') {
            return CartsMongo.instance
        }

        super({
            name: CartModel.CartCollection,
            schema: CartModel.CartSchema
        });

        CartsMongo.instance = this
        return this
    }

    async getCartById(id) {
        try {
            return await this.model.findById(id).populate('products')
        } catch (error) {
            logger.error(`error in getCartById-CartsMongo - Error: `, error)
        }
    }

    async getAllCarts() {
        try {
            return await super.getAll()
        } catch (error) {
            logger.error(`error in getAllCarts-CartsMongo - Error: `, error)
        }
    }

    async saveCart(element) {
        try {
            return await super.save(element)
        } catch (error) {
            logger.error(`error in saveCart-CartsMongo - Error: `, error)
        }
    }

    async getCartById(id) {
        try {
            return await super.getById(id)
        } catch (error) {
            logger.error(`error in getCartById-CartsMongo - Error: `, error)
        }
    }

    async updateCartById(id, newData) {
        try {
            return await super.updateById(id, newData)
        } catch (error) {
            logger.error(`error in updateCartById-CartsMongo - Error: `, error)
        }
    }

    async deleteCartById(id) {
        try {
            return await super.deleteById(id)
        } catch (error) {
            logger.error(`error in deleteCartById-CartsMongo - Error: `, error)
        }
    }
}
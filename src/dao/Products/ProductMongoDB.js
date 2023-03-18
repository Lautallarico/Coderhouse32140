import { ContainerMongoDB } from "../../container/index.js";
import { ProductModel } from "../../models/index.js";
import logger from '../../loggers/loggers.js'

export class ProductsMongo extends ContainerMongoDB {

    static getInstance() {
        return new ProductsMongo()
    }

    constructor() {

        if (typeof ProductsMongo.instance === 'object') {
            return ProductsMongo.instance
        }


        super({
            name: ProductModel.ProductCollection,
            schema: ProductModel.ProductSchema,
        });

        ProductsMongo.instance = this
        return this
    }
    
    async getAllProducts() {
        try {
            return await super.getAll()
        } catch (error) {
            logger.error(`error in getAllProducts-ProductMongo - Error: `, error)
        }
    }

    async saveProduct(element) {
        try {
            return await super.save(element)
        } catch (error) {
            logger.error(`error in saveProduct-ProductMongo - Error: `, error)
        }
    }

    async getProductById(id) {
        try {
            return await super.getById(id)
        } catch (error) {
            logger.error(`error in getProductById-ProductMongo - Error: `, error)
        }
    }

    async updateProductById(id, newData) {
        try {
            return await super.updateById(id, newData)
        } catch (error) {
            logger.error(`error in updateProductById-ProductMongo - Error: `, error)
        }
    }

    async deleteProductById(id) {
        try {
            return await super.deleteById(id)
        } catch (error) {
            logger.error(`error in deleteProductById-ProductMongo - Error: `, error)
        }
    }

}
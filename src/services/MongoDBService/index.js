import { config } from '../../config/index.js'
import logger from '../../loggers/loggers.js'
import mongoose from "mongoose";

const init = async () => {
    try {
        mongoose.connect(config.DATABASE.mongo.url, {
            dbName: config.DATABASE.mongo.dbName
        })
        
        logger.info('Connection with MongoDB succesful')

    } catch (error) {
        logger.error('Error in connection with Mongo DB ', error)
    }
}

export const MongoDBService = {
    init,
}
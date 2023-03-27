
import { Schema } from "mongoose";

const MessageCollection = 'messages'

const MessageSchema = new Schema(
    {   
        text: { type: String, require: true, max: 200 },
        timestamp: { type: String, require: true, max: 100 },
    },
    {
        virtuals: true
    }
)

MessageSchema.set('toJSON', {
    transform: (_, response) => {
        response.id = response._id
        delete response.__v
        delete response._id
        return response
    }
})


export const MessagesModel = { MessageSchema, MessageCollection }
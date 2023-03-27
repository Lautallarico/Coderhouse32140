import { Schema } from "mongoose";

const ChatCollection = 'chats'

const ChatSchema = new Schema(
    {
        messages: [{ type: Schema.Types.ObjectId, ref: 'messages' }],
        timestamp: { type: String, require: true, max: 100 },
    },
    {
        virtuals: true
    }
)

ChatSchema.set('toJSON', {
    transform: (_, response) => {
        response.id = response._id
        delete response._id
        return response
    }
})


export const ChatModel = { ChatSchema, ChatCollection }
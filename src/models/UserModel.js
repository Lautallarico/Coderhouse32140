
import { Schema } from "mongoose";

const UserCollection = 'user'

const UserSchema = new Schema(
    {
        name: String,
        lastname: String,
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: String,
        adress: String,
        age: Number,
        celPhone: Number,
        cart: { type: Schema.Types.ObjectId, ref: 'carts' },
        chats: { type: Schema.Types.ObjectId, ref: 'chats' }
    },
    { virtuals: true }
)

UserSchema.set('toJSON', {
    transform: (_, response) => {
        response.id = response._id
        delete response.__v
        delete response._id
        return response
    }
})

export const UserModel = { UserCollection, UserSchema }
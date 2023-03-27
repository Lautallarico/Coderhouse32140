import { CartsMongo, CartFileSystem, CartDataBase } from './Carts/index.js'
import { ProductsMongo, ProductBataBase, ProductFileSystem } from './Products/index.js'
import { MessagesDataBase, MessagesFileSystem, MessagesMongo } from './Messages/index.js'
import { ChatsDataBase, ChatsFileSystem, ChatsMongo } from './Chats/index.js'
import { MongoDBService } from '../services/index.js'
import { config } from '../config/index.js'
import { UsersMongo } from './Users/index.js'



const getSelectedDaos = () => {
    switch (config.SERVER.SELECTED_DATABASE) {
        case 'mongo': {
            MongoDBService.init();
            return {
                ProductDao: ProductsMongo.getInstance(),
                CartDao: CartsMongo.getInstance(),
                UserDao: UsersMongo.getInstance(),
                MessagesDao: MessagesMongo.getInstance(),
                ChatDao: ChatsMongo.getInstance()
            }
        }
        case 'filesystem': {
            return {
                ProductDao: new ProductFileSystem(),
                CartDao: new CartFileSystem(),
                UserDao: new UsersMongo(),
                MessagesDao: new MessagesFileSystem(),
                ChatDao: new ChatsFileSystem()
            }
        }
        case 'database': {
            return {
                ProductDao: new ProductBataBase(),
                CartDao: new CartDataBase(),
                UserDao: new UsersMongo(),
                MessagesDao: new MessagesDataBase(),
                ChatDao: new ChatsDataBase()
            }
        }
    }
}

const { ProductDao, CartDao, UserDao, MessagesDao, ChatDao } = getSelectedDaos();

export { ProductDao, CartDao, UserDao, MessagesDao, ChatDao }

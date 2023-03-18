import { CartsMongo, CartFileSystem } from './Carts/index.js'
import { ProductsMongo, ProductBataBase, ProductFileSystem } from './Products/index.js'
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
                UserDao: UsersMongo.getInstance()
            }
        }
        case 'filesystem': {
            return {
                ProductDao: new ProductFileSystem(),
                CartDao: new CartFileSystem(),
                UserDao: new UsersMongo(),
            }
        }
        case 'database': {
            return {
                ProductDao: new ProductBataBase(),
                CartDao: new CartDatabase(),
                UserDao: new UsersMongo(),
            }
        }
    }
}

const { ProductDao, CartDao, UserDao } = getSelectedDaos();

export { ProductDao, CartDao, UserDao }

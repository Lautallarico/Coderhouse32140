import { ContainerDataBase } from '../../container/index.js'
import { config } from '../../config/index.js'


export class ChatsDataBase extends ContainerDataBase {
    constructor() {
        super(config.DATABASE.sql_lite)
    }
}
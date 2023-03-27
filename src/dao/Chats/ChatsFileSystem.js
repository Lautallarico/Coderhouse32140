import { ContainerFilesystem } from "../../container/index.js";
import { config } from "../../config/index.js";

export class ChatsFileSystem extends ContainerFilesystem {
    constructor() {
        super(config.DATABASE.filesystem.CHATS_FILENAME)
    }
}
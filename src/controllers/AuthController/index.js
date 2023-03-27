import { UserDao, CartDao, ChatDao } from "../../dao/index.js";
import { BCRYPT_VALIDATION, EMAIL_UTILS, ERRORS_UTILS } from "../../utils/index.js";
import logger from '../../loggers/loggers.js'

const signUp = async (req, res, cb) => {
    try {

        const { name, lastname, email, password, adress, age, celPhone } = req.body

        if (!name || !lastname || !email || !password || !adress || !age || !celPhone) return res.status(400).send({ success: false, message: "Parametros no validos" })

        const existUser = await UserDao.getOneUser({ email })

        if (existUser && !existUser.password) {
            const updateUser = await UserDao.updateUserById(existUser._id, { ...existUser, password })
            return res.status(200).send({ success: true })
        }
        const userCart = await CartDao.saveCart()
        const userChat = await ChatDao.saveChat()
        const newUser = await UserDao.saveUser({ name, lastname, email, password: BCRYPT_VALIDATION.hashPassword(password), adress, age, celPhone, cart: userCart.id, chats: userChat.id })

        let subject = 'Nuevo usuario creado'
        let mailTo = 'lauta.tallarico@gmail.com'
        let html = `
                    <h3>Nuevo registro de usuario!</h3>
                    <p> Datos:</p>
                    <ul>
                    <li> Nombre y apellido: ${name} ${lastname}</li>
                    <li> Email: ${email}</li>
                    <li> Teléfono: ${celPhone}</li>
                    <li> Edad: ${age}</li>
                    <li> Direccion: ${adress}</li>
                    </ul>
        `


        await EMAIL_UTILS.sendEmail(mailTo, subject, html)


        res.status(200).send({ success: true, user: newUser, message: "Usuario creado" })
        return cb(null, newUser)

    } catch (error) {

        logger.error(`error from AuthRouter-Post: ${error}`);
        res.status(400).send({ success: false, message: "Parametros no validos" })
    }
}

const login = async (req, res) => {
    try {

        const user = req.user
        res.status(200).send({ success: true, user: user, message: "Sesión iniciada correctamente" })

    } catch (error) {

        logger.error(`error from AuthRouter-login: ${error}`)
        res.status(401).send({ success: false, message: "Credenciales incorrectas" })

    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await UserDao.deleteUserById(id)

        if (!user) {
            return res.status(404).send({ success: false, data: undefined, message: ERRORS_UTILS.USERS.NO_USER_OR_PASSWORD })
        }

        res.status(200).send({ success: true, message: "Usuario eliminado" })
    } catch (error) {
        logger.error(`error dorm deleteUser: ${error}`)
        res.status(404).send({ success: false, data: undefined, message: ERRORS_UTILS.USERS.NO_USER_OR_PASSWORD })
    }
}


export const AuthControllers = { signUp, login, deleteUser }
import { UserDao, CartDao } from "../../dao/index.js";
import { BCRYPT_VALIDATION, EMAIL_UTILS } from "../../utils/index.js";
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
        const newUser = await UserDao.saveUser({ name, lastname, email, password: BCRYPT_VALIDATION.hashPassword(password), adress, age, celPhone, cart: userCart.id })

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

        res.status(200).send({ success: true, data: newUser })
        return cb(null, newUser)

    } catch (error) {

        logger.error(`error from AuthRouter-Post`);
        res.status(400).send({ success: false, message: "sign up fail" })
    }
}

const login = async (email, password, done) => {
    try {
        console.log("email: ", email);
        console.log("password: ", password);
        if (!email || !password) return done(null, false, { message: "Password or user not valid user" })
        const user = await UserDao.getOne({ email: email })
        console.log(user);

        if (!user) {
            logger.warn(`Password or user not valid user`);
            return done(null, false, { message: "Password or user not valid user" })
        }

        if (BCRYPT_VALIDATION.isValidPassword(password, user) != true) {
            logger.warn(`Password or user not valid pass`);
            return done(null, false, { message: "Password or user not valid user" })
        }

        const userResponse = {
            id: user._id,
            email: user.email,
            cart: user.cart,
            name: user.name,
            lastname: user.lastname,
            adress: user.adress,
            age: user.age,
            celPhone: user.celPhone
        };

        // res.send({ success: true, data: userResponse })
        return done(null, userResponse, { message: "login sucessful" })

    } catch (error) {
        // res.send({ success: false, message: "login fail" })
        logger.error(`error from middlewares/passportAuth - LocalStrategy`, error)
        return done(null, error, { message: "error catch" })
    }
}

const githubLogin = async (accessToken, refreshToken, profile, done) => {
    try {

        const githubEmail = profile.emails?.[0].value

        if (!githubEmail) return done(null, false)

        const user = await UserDao.getOneUser({ email: githubEmail })

        if (user) {
            const userResponse = {
                id: user._id,
                email: user.email,
                cart: user.cart
            }

            return done(null, userResponse)
        }

        const newUser = {
            email: githubEmail,
            name: profile._json.name,
            lastname: "--",

        }

        const createUser = await UserDao.saveUser(newUser)

        const userResponse = {
            id: createUser._id,
            email: createUser.email,
            cart: createUser.cart
        }

        res.redirect('welcome', {})
        done(null, userResponse)

    } catch (error) {
        res.render('/api/auth/login-error')
        logger.error(`error from middlewares/passportAuth - GithubStrategy`)
        console.log(`error from middlewares/passportAuth - GithubStrategy`)
        done(error)
    }

}

const githubUser = async (req, res) => {
    res.send(req.user)
}


export const AuthControllers = { signUp, login, githubLogin, githubUser }
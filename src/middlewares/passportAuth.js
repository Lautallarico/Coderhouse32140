
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserDao } from "../dao/index.js";
import logger from '../loggers/loggers.js';
import { BCRYPT_VALIDATION } from '../utils/index.js'


const init = () => {

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await UserDao.getById(id)
        done(null, user)
    })

    passport.use("login", new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    }, async (req, email, password, done) => {
        try {

            if (!email || !password) return done(null, false, { message: "Password or user not valid user" })
            const user = await UserDao.getOne({ email: email })

            if (!user) {
                logger.warn(`Password or user not valid user`);
                return done(null, false, { message: "Password or user not valid user" })
            }

            if (BCRYPT_VALIDATION.isValidPassword(password, user) != true) {
                logger.warn(`Password or user not valid pass`);
                return done(null, false, { message: "Password or user not valid user" })
            }

            return done(null, user)


        } catch (error) {
            
            logger.error(`error from middlewares/passportAuth - LocalStrategy`, error)
            return done(null, error, { message: "error catch" })
        }
    }))

}

export const PassportAuth = {
    init,
}
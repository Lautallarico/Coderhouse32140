import { config } from '../config/index.js';
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { UserDao } from "../dao/index.js";
import { AuthControllers } from '../controllers/AuthController/index.js';

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
    }, AuthControllers.login))

    passport.use('github', new GithubStrategy({
        clientID: config.PASSPORT.GITHUB.GITHUB_CLIENT_ID,
        clientSecret: config.PASSPORT.GITHUB.GITHUB_CLIENT_SECRET,
        callbackURL: config.PASSPORT.GITHUB.GITHUB_CLIENT_CALLBACK_URL,
        scope: ['user:email']
    }, AuthControllers.githubLogin))
}

export const PassportAuth = {
    init,
}
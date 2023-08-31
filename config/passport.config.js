import passport from "passport"
import passportLocal from "passport-local"
import userModel from "../DAO/mongo/models/user.model.js"
import { createHash, isValidPassword } from "../src/utils.js"

const LocalStrategy = passportLocal.Strategy

export const initializePassport = () => {

  passport.use("register", new LocalStrategy(
    {passReqToCallback: true, usernameField: "email"},
    async (req, username, password, done) => {
      try {

        const user = await userModel.findOne({ email: username })

        if(user) {

          console.log("usuario ya existe")

          return done(null, false)
        }

        const body = req.body

        body.password = createHash(body.password)

        console.log(body)

        const newUser = await userModel.create(body)

        return done(null, newUser)

      } catch (err) {

        return done(err)
      }
    }
  ))

  passport.use("login", new LocalStrategy(
    {usernameField: "email"},
    async (email, password, done) => {

      try {

        let user = await userModel.findOne({ email: email })

        if(!user) {

          console.log("usuario no existe en el sistema")

          return done(null, false)
        }

        if(!isValidPassword(password, user.password)) {

          console.log("datos incorrectos")

          return done(null, false)

        }

        user = user.toObject()

        delete user.password

        done(null, user)

      } catch (e) {

        return done(e)
      }
    }
  ))

  passport.serializeUser((user, done) => {

    console.log("serialize user")

    done(null, user._id)
  })

  passport.deserializeUser( async (id, done) => {

    console.log("deserialize user")

    const user = await userModel.findOne(id);

    done(null, user)
  })
}

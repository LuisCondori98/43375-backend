import passportLocal from "passport-local"
import userModel from "../DAO/mongo/models/user.model.js"
import { isValidPassword } from "../src/utils.js"

const LocalStrategy = passportLocal.Strategy

export const loginLocalStrategy = new LocalStrategy(

    { usernameField: "email" },
    
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

        console.log(user)

        delete user.password

        done(null, user)

      } catch (e) {

        return done(e)
      }
    }
  )
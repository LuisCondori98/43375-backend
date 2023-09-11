import passportLocal from "passport-local"
import userModel from "../DAO/mongo/models/user.model.js"
import { createHash, isValidPassword } from "../src/utils.js"

const LocalStrategy = passportLocal.Strategy

export const registerLocalStrategy = new LocalStrategy(

  { passReqToCallback: true, usernameField: 'email' },

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

    } catch (e) {

      return done(e)
    }
  }
)
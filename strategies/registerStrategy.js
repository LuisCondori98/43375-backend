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

      if(body.name == "" ||
         body.lastname == "" ||
         body.email == "" ||
         body.age == "" ||
         body.password == ""
         ) {

      console.log("no mando datos completos")

      return done(null)

      } else {

        const data = {
          name: body.name,
          lastname: body.lastname,
          email: body.email,
          age: body.age,
          password: createHash(body.password)
        }
  
        // body.password = createHash(body.password)
  
        console.log(body)
  
        const newUser = await userModel.create(data)
  
        return done(null, newUser)

      }

    } catch (e) {

      return done(e)
    }
  }
)
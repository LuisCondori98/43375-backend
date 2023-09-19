import Facebook from "passport-facebook"
import userModel from "../DAO/mongo/models/user.model.js"
import { generateToken } from "../src/utils.js"

export const faceStrategy = new Facebook(
  {
    clientID: "1938296243223997",
    clientSecret: "22ac350495f72daafbb103a4b8ee6fd3",
    callbackURL: "http://localhost:8080/api/session/facebook-callback"
  },
  async (accesToken, refreshToken, profile, done) => {

    try {

      const user = await userModel.findOne({ name: profile._json.name})

      console.log({user})

      if(user) {

        console.log("user existed")

        return done(null, user)

      }

      console.log(profile)

      const newUser = await userModel.create({
        // username: profile._json.login,
        name: profile._json.name,
      })

      // const token = generateToken(newUser)

      return done(null, newUser)

    } catch (e) {

      return done(e)

    }

  }
)
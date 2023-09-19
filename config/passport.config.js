import passport from "passport"
import userModel from "../DAO/mongo/models/user.model.js"
import { registerLocalStrategy } from "../strategies/registerStrategy.js"
import { loginLocalStrategy } from "../strategies/loginStrategy.js"
import { gitHubStrategy } from "../strategies/githubStrategy.js"
import { generateToken } from "../src/utils.js"
import { faceStrategy } from "../strategies/facebookStrategy.js"

export const initializePassport = () => {

  passport.use('github', gitHubStrategy)
  passport.use("facebook", faceStrategy)
  passport.use('login', loginLocalStrategy)
  passport.use('register', registerLocalStrategy)

  passport.serializeUser((user, done) => {

    console.log("serialize user")

    done(null, user._id)
  })

  passport.deserializeUser( async (id, done) => {

    console.log("deserialize user")

    let user = await userModel.findOne({_id : id});

    // let user = await userModel.findById(id);

    const token = generateToken(user)

    user = user.toObject()

    user.access_token = token

    user.admin = false

    if(user.email == "adminCoder@coder.com") {

      user.admin = true
    }

    done(null, user)
  })
}

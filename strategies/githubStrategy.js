import GitHubStrategy from "passport-github2"
import userModel from "../DAO/mongo/models/user.model.js"
import { generateToken } from "../src/utils.js"

export const gitHubStrategy = new GitHubStrategy({

  clientID: "Iv1.c85736895d6b43c0",
  clientSecret: "d354d36da8319db4896e4949d59e92cd38a0cb41",
  callbackURL: "http://localhost:8080/api/session/github-callback"

}, async (accesToken, refreshToken, profile, done) => {

    try {

      console.log({profile})

      let user = await userModel.findOne({ name: profile._json.login })

      if (user) {

        console.log('Usuario ya existe')
        
        const token = generateToken(user)

        user = user.toObject()

        user.access_token = token

        console.log({ user })

        return done(null, user)
      }
      
      const newUser = await userModel.create({
        // username: profile._json.login,
        name: profile._json.login,
        email: profile._json.email
      })

      const token = generateToken(newUser)

      console.log({ token })

      // return done(null, {
      //   ...newUser,
      //   access_token: token
      // })

      return done(null, newUser)

    } catch (err) {

      return done(err)
    }
  }
)
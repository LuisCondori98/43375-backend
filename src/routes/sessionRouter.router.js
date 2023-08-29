import {Router} from "express"
import userModel from "../../DAO/mongo/models/user.model.js"
import { createHash, isValidPassword } from "../utils.js"

export const sessionRouter = Router()


sessionRouter.get("/", (req, res) => {

  return res.json(req.session)
})


sessionRouter.post("/register", async (req, res) => {

  if(req.body.name === "" || req.body.lastname === "" || req.body.email === "" || req.body.age === "" || req.body.password === "") {

    console.log("ingrese datos")

    return res.redirect("/views/login")
  }else {

    req.body.password = createHash(req.body.password)

    const dataUser = await userModel.create(req.body)

    console.log(dataUser)

    setTimeout(() => {
      return res.redirect("/views/login")
    }, 3000)
  }
})


sessionRouter.post("/login", async (req, res) => {

  let user = await userModel.findOne({ email: req.body.email})

  console.log(user)

  // if(!user || user.password !== req.body.password) {
  //   console.log("failed to login")

  //   return res.redirect("/views/login")
  // }

  // if(user.password !== req.body.password) {
  //   console.log("password not found")

  //   return res.status(401).redirect("/views/login")
  // }

  if(!isValidPassword(req.body.password, user.password)) {

    return res.status(403).redirect("/views/login")
  }

  user = user.toObject()

  req.session.user = user

  req.session.user.admin = false

  if(req.session.user.email == "adminCoder@coder.com") {
    req.session.user.admin = true
  }

  delete user.password

  return res.redirect("/views/products")
})


sessionRouter.post("/logout", async (req, res) => {

  const user = req.session.user

  if (user) {

    req.session.destroy()

    res.clearCookie('connect.sid')

    return res.redirect("/views/login")
  } else {
    
    return res.json({ msg: 'no user to log out!' })
  }
})

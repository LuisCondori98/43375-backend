import {Router} from "express"
import userModel from "../../DAO/mongo/models/user.model.js"
import passport from "passport"
import { createHash, isValidPassword } from "../utils.js"

export const sessionRouter = Router()


sessionRouter.get("/", (req, res) => {

  return res.json(req.session)
})


sessionRouter.post("/register",
  passport.authenticate("register", {failureRedirect: "/failregister"}),
  async (req, res) => {

    // res.send({status: "succes", msg: "user registered"})

    return res.redirect("/views/login")

  // if(req.body.name === "" || req.body.lastname === "" || req.body.email === "" || req.body.age === "" || req.body.password === "") {

  //   console.log("ingrese datos")

  //   return res.redirect("/views/login")
  // }

  // req.body.password = createHash(req.body.password)

  // const dataUser = await userModel.create(req.body)

  // console.log(dataUser)

  // return res.redirect("/views/login")

})


sessionRouter.get("/failregister", (req, res) => {

  return res.json("error al registrarse")
})


sessionRouter.post("/login",
  passport.authenticate("login", {failureRedirect: "/faillogin", failureFlash: true}),
  async (req, res) => {

    // return res.json(req.user)

  // let user = await userModel.findOne({ email: req.body.email })

  // const user = req.user

  // if(!user) return res.redirect("/views/login")

  // if(!isValidPassword(req.body.password, user.password)) {

  //   return res.status(403).redirect("/views/login")
  // }

  // user = user.toObject()

  // req.session.user = user

  // req.session.user.admin = false

  // if(req.session.user.email == "adminCoder@coder.com") {

  //   req.session.user.admin = true
  // }

  // delete user.password

  // return res.json(req.user)

  return res.redirect("/views/products")
})


sessionRouter.get("/faillogin", (req, res) => {

  return res.json("error al iniciar sesion")
})


sessionRouter.post("/logout", async (req, res) => {

  const user = req.user

  if (user) {

    req.session.destroy()

    res.clearCookie('connect.sid')

    return res.redirect("/views/login")
  } else {
    
    return res.json({ msg: 'no user to log out!' })
  }
})


sessionRouter.post("/recovery-password", async (req, res) => {

  const user = await userModel.findOne({email: req.body.email})

  if(!user) {

    console.log("user not found")

    return res.redirect("/views/recovery-password")
  }

  const newPassword = createHash(req.body.password)

  await userModel.updateOne({ email: user.email }, { password: newPassword })

  return res.redirect("/views/login")
})


sessionRouter.get("/github", passport.authenticate("github", {scope: ["user: email"]}), async (req, res) => {
  
  // return res.json("bienvenido")
})

sessionRouter.get("/github-callback", passport.authenticate("github", {failureRedirect: "/login"}), async (req,res) => {

  // req.session.user = req.user

  // res.redirect("/")

  return res.redirect("/views/products")
})

sessionRouter.get("/facebook", passport.authenticate("facebook"), async (req, res) => {


})

sessionRouter.get("/facebook-callback", passport.authenticate("facebook", {failureRedirect: "/login"}), async (req, res) => {

  // return res.json(req.user)

  return res.redirect("/views/products")
})

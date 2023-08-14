import {Router} from "express"
import msgModel from "../../DAO/mongo/models/messages.model.js"

export const chatRouter = Router()

chatRouter.get("/", (req, res) => {

  const data = {
    title: "CHAT",
    style: "chat.css"
  }

  return res.render("chat", data)
})

chatRouter.post("/", async(req, res) => {

  const body = req.body

  const mesg = await msgModel.create({
    user: body.user,
    message: body.message
  })

  return res.redirect("/chat?")
})

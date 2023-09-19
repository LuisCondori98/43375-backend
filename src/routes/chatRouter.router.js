import { Router } from "express";
import msgModel from "../../DAO/mongo/models/messages.model.js";
import { socketServer } from "../app.js";

export const chatRouter = Router();

chatRouter.get("/", (req, res) => {

  if(!req.user) {
    
    return res.redirect("/views/login")
  }
  
  return res.status(200).render("chat", {title: "Chat-MPV", style: "chat.css"});
});

chatRouter.post("/", async (req, res) => {

  console.log(req.user)

  const data = await msgModel.create({
    user: req.user.name,
    message: req.body.message
  })

  console.log(data)

  return res.status(200)
})

import { Router } from "express";
import msgModel from "../../DAO/mongo/models/messages.model.js";
import { socketServer } from "../app.js";

export const chatRouter = Router();

chatRouter.get("/", (req, res) => {

  if(!req.session.user) {
    
    return res.redirect("/views/login")
  }
  
  return res.status(200).render("chat", {title: "Chat-MPV", style: "chat.css"});
});

chatRouter.post("/", async (req, res) => {

  // req.body.user = req.session.user.name

  socketServer.emit("name-user", {})

  const data = await msgModel.create(req.body)

  console.log(data)

  return res.status(200)
})

import express from 'express';
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { productsRouter } from './routes/productsRouter.router.js';
import { cartsRouter } from './routes/cartsRouter.router.js';
import { viewsRouter } from './routes/viewsRouter.router.js';
import { chatRouter } from './routes/chatRouter.router.js';

const app = express();
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))

// HANDLEBARS
app.engine("handlebars", handlebars.engine())
app.set("./views", "/views")
app.set("view engine", "handlebars")

//Mongoose
const MONGO_CONNECT = "mongodb+srv://lcondori11:100198@codercluster.jw83zt7.mongodb.net/ecommerce?retryWrites=true&w=majority"

mongoose.connect(MONGO_CONNECT)
  .then(() => {
    console.log("Mongo Connected")
  }).catch(err => {
    console.log(err)
  })

// WEBSOCKET
const httpServer = app.listen(PORT, () => {

  console.log(`listeng on port http://localhost:${PORT}`)
})

export const io = new Server(httpServer)

io.on("connection", socket => {

  socket.on("user", (user) => {
    console.log(`cliente ${user} conectado`)
  })

  socket.on("user", (user) => console.log(user))

  console.log("cliente conectado")

  socket.emit("message", "BIENVENIDO USUARIO")

  // socket.on("disconnect", () => console.log("user disconnected"))

  socket.on("message_prod", (data) => console.log(data))

  // socket.on("selectValue", (data) => console.log(data))
})

// HOME
app.get("/", (req, res) => {
  res.send(`
    <div style='display: flex; flex-direction: column; align-items: center'>
      <h1>Routes</h1>
      <h2>/api/products</h2>
      <h2>/api/carts</h2>
      <h2>/views</h2>
    </div>
  `)
})

// ENDPOINTS
app.use("/views", viewsRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/chat", chatRouter)

// ROUTE NOT FOUND
app.get("*", (req, res) => {
  res.send(`
    <div style='display: flex; flex-direction: column; justify-content: center; align-items: center'>
      <h1>404</h1>
      <h2>NOT FOUND</h2>
    </div>
  `)
})

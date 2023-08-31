import express from 'express';
import handlebars from "express-handlebars";
import mongoose from "mongoose";
// import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo"
import session from "express-session";
import passport from "passport";
// import flash from "connect-flash"
import { initializePassport } from '../config/passport.config.js';
import { Server } from "socket.io";
import { productsRouter } from './routes/productsRouter.router.js';
import { cartsRouter } from './routes/cartsRouter.router.js';
import { viewsRouter } from './routes/viewsRouter.router.js';
import { chatRouter } from './routes/chatRouter.router.js';
import { sessionRouter } from './routes/sessionRouter.router.js';

const app = express();
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(flash())

// CARPETA PUBLIC ESTATICO
app.use(express.static("public"))

// app.use(cookieParser("coderSecret"))

app.use(session({
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://luisbarker11:IvkCQGSAr89lPcCh@cluster.p21e02a.mongodb.net/ecommerce?retryWrites=true&w=majority",
    mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
    ttl: 30
  }),
  secret: "secretCoder",
  resave: true,
  saveUninitialized: true,
  // maxAge: true
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

// HANDLEBARS
app.engine("handlebars", handlebars.engine())
app.set("./views", "/views")
app.set("view engine", "handlebars")

//Mongoose
const MONGO_CONNECT = "mongodb+srv://luisbarker11:IvkCQGSAr89lPcCh@cluster.p21e02a.mongodb.net/ecommerce?retryWrites=true&w=majority"

mongoose.connect(MONGO_CONNECT)
  .then(() => {
    console.log("Mongo Connected")
  }).catch(err => {
    console.log(err)
  })

// WEBSOCKET
const httpServer = app.listen(PORT, () => console.log(`listeng on port http://localhost:${PORT}`))

export const socketServer = new Server(httpServer)

let msgs = []

socketServer.on("connection", socket => {

  socket.on("msg_front_to_back", (msg) => {

    msgs.push(msg)

    socketServer.emit("listado_msgs", msgs)
  });
})

// ENDPOINTS
app.use("/views", viewsRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/chat", chatRouter);
app.use("/api/session", sessionRouter)

// ROUTE NOT FOUND
app.get("*", (req, res) => {
  res.send(`
    <div style='display: flex; flex-direction: column; justify-content: center; align-items: center; height: 500px'>
      <h1>404</h1>
      <h3>NOT FOUND</h3>
    </div>
  `)
})

import { Router } from "express";
import productsModel from "../../DAO/mongo/models/products.model.js";
import cartsModel from "../../DAO/mongo/models/carts.model.js";

export const viewsRouter = Router()


viewsRouter.get("/", async (req, res) => {

  res.render("index", {style: "index.css"})
})


viewsRouter.get("/products", async (req, res) => {

  if (!req.user) {

    console.log("logeate")

    return res.redirect("/views/login")
  }

  let limit = parseInt(req.query.limit) || 10

  let page = parseInt(req.query.page) || 1;

  let sort = req.query.sort

  if(sort == "desc") {

    const desc = await productsModel.aggregate([
      {
        $sort: { price: 1}
      }
    ])

    console.log(desc)
  }

  const prods = await productsModel.paginate({}, {limit, page, sort})

  // const prods = await productsModel.find({title: name})

  prods.docs = prods.docs.map(prod => prod.toObject())

  // const prodsObj = prods.map(prods => prods.toObject())

  return res.render("products", {
    title: "Products",
    products: prods.docs,
    style: "products.css",
    hasNext: prods.hasNextPage,
    hasPrev: prods.hasPrevPage,
    next: prods.nextPage,
    prev: prods.prevPage,
    limit: prods.limit,
    totalP: prods.totalPages,
    page: prods.page,
    sort: prods.sort
  })
})


const admin = (req, res, next) => {

  if(!req.user) {
    return res.redirect("/views/login")
  }

  if(!req.user.admin) {
    console.log("no eres admin")
    return res.redirect("/views/products")
  }
  
  next()
}


viewsRouter.get("/realtimeproducts", admin, async(req, res) => {

  return res.render("realTimeProducts", {
    title: "products",
    style: "realtimeproducts.css"
  })
})


const sessionMiddleware = (req, res, next) => {

  if(req.user) {

    return res.redirect("/views/profile")
  }

  return next()
}


viewsRouter.get("/register", sessionMiddleware, (req, res) => {

  return res.render("register", {
    title: "Registro",
    style: "register.css"
  })
})


viewsRouter.get("/login", sessionMiddleware, (req, res) => {

  return res.render("login", {
    title: "Login",
    style:"login.css",
  })
})


viewsRouter.get("/profile", (req, res, next) => {

  if(!req.user) {

    return res.redirect("/views/login")
  }

  return next()
}, (req, res) => {

  const user = req.user

  console.log(req.user)

  return res.render("profile", {
    user: user,
    style: "profile.css",
    title: "Perfil"
  })
})


viewsRouter.get("/carts", async (req, res) => {

  const cart = await cartsModel.find()

  return res.render("carts", {cart: cart})

  // return res.render("carts", {props: props})
})


// viewsRouter.get("/carts/:cid", async (req, res) => {

//   const cid = req.params.cid

//   const cart = await cartsModel.findOne({_id: cid})

//   if(!cart) {

//     return res.redirect("/views/login")
//   }

//   const arr = cart.product

//   console.log(arr)

//   return res.render("carts", {arr: arr})
// })

viewsRouter.get("/faillogin", (req, res) => {

  return res.render("faillogin")
})

viewsRouter.get("/failregister", (req, res) => {

  return res.render("failregister")
})

viewsRouter.get("/fail-recovery", (req, res) => {

  return res.render("fail-recovery")
})

viewsRouter.get("/recovery-password", (req, res) => {
  
   return res.render("recovery-password", {
    title: "Recovery Password",
    style: "recovery-password.css"
  })
})
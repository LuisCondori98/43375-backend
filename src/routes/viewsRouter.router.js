import { Router } from "express";
// import { product } from "./productsRouter.router.js";
import { uploader } from "../utils.js";
import productsModel from "../../DAO/mongo/models/products.model.js";

export const viewsRouter = Router()

viewsRouter.get("/products", async (req, res) => {

  let limit = parseInt(req.query.limit) || 10

  let page = parseInt(req.query.page) || 1;

  // const sort = await productsModel.aggregate([
  //       {
  //         $sort: { price: -1}
  //       }
  //     ])

  // console.log(sort)

  const prods = await productsModel.paginate({}, {limit, page})

  // console.log(orders)

  // const prods = await productsModel.find({title: name})

  prods.docs = prods.docs.map(prod => prod.toObject())

  console.log(prods)

  // const prodsObj = prods.map(prods => prods.toObject())

  return res.render("home", {
    title: "home",
    products: prods.docs,
    style: "home.css",
    hasNext: prods.hasNextPage,
    hasPrev: prods.hasPrevPage,
    next: prods.nextPage,
    prev: prods.prevPage,
    limit: prods.limit,
    totalP: prods.totalPages,
    page: prods.page
  })
})

viewsRouter.get("/", async (req, res) => {

  let limit = parseInt(req.query.limit) || 10

  let page = parseInt(req.query.page) || 1;

  const prods = await productsModel.paginate({}, {limit, page})

  res.status(201).json(prods)
})

viewsRouter.get("/realtimeproducts", async(req, res) => {

  return res.render("realTimeProducts", {
    title: "products",
    style: "realtimeproducts.css"
  })
})

viewsRouter.post("/realtimeproducts", uploader.single("file"), async (req, res) => {

  const data = req.body

  try {
    const dataSend = await productsModel.create({
      title: data.title,
      description: data.description,
      price: data.price,
      thumbnail: data.file,
      category: data.category,
      stock: data.stock,
      code: data.code,
      status: true
    })

    console.log(req.file)

    return res.status(200).redirect("/views/realtimeproducts")
  }catch (err) {
    console.log(err)
  }

  // res.redirect("/views/realtimeproducts")

})

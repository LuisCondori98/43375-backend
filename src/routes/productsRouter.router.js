import { Router } from "express";
import { uploader } from "../utils.js";
import productsModel from "../../DAO/mongo/models/products.model.js";
// import { ProductManager } from "../../DAO/mongo/managerMongo/ProductManager.js";

export const productsRouter = Router();

// const product = new ProductManager()

productsRouter.get("/", async (req, res) => {

  const limit = req.query.limit || 10

  const page = req.query.page || 1

  const sort = req.query.sort

  const query = req.query.category

  if(sort == "desc") {
    const sortFil = await productsModel.aggregate([
      {
        $sort: { price: -1 }
      }
    ])

    return res.json(sortFil)
  }

  if(sort == "asc") {
    const sortFil = await productsModel.aggregate([
      {
        $sort: { price: 1 }
      }
    ])

    return res.json(sortFil)
  }

  console.log(sort)

  const prods = await productsModel.paginate(query ? {category: query} : {}, {limit: limit, page: page})

  // const prodsObject = prods.docs.map(docs => docs.toObject())

  prods.prevLink = prods.prevPage
  prods.nextLink = prods.nextPage

  console.log(prods)
  console.log(sort)

  return res.json(prods)
})


productsRouter.get("/:pid", async (req, res) => {

  const { pid } = req.params

  const prodById = await productsModel.findById(pid)

  try {

    res.status(200).json(prodById)
  }catch (err) {

    console.log(err)
  }
})


productsRouter.post("/", uploader.single("file"), async(req, res) => {

  const body = req.body

  try {

    const data = await productsModel.create({
      title: body.title,
      description: body.description,
      price: body.price,
      thumbnail: req.file.filename,
      category: body.category,
      stock: body.stock,
      code: body.code,
      status: true
    })

    // req.file ? body.thumbnail = req.file.filename : ""

    return res.json(data)
  } catch (err) {
    console.log(err)

    return res.json("prod code repeated")
  }
})


productsRouter.post("/realtimeproducts", uploader.single("file"), async (req, res) => {

  const body = req.body

  try {
    const dataSend = await productsModel.create({
      title: body.title,
      description: body.description,
      price: body.price,
      thumbnail: body.file,
      category: body.category,
      stock: body.stock,
      code: body.code,
      status: true
    })

    console.log(dataSend)

    return res.status(200).redirect("/views/realtimeproducts")
  }catch (err) {
    console.log(err)
  }

  // res.redirect("/views/realtimeproducts")

})


productsRouter.put("/:pid", async (req, res) => {

  const { pid } = req.params
  const prodUpdate = req.body

  try {
    const up = await productsModel.updateOne({_id: pid}, prodUpdate)

    return res.status(201).json(up)
  } catch (err) {
    console.log("failed to update prod")
  }

})


productsRouter.delete("/:pid", async (req, res) => {

  const {pid} = req.params

  console.log(pid)

  try {

    await productsModel.deleteOne({_id: pid})

    return res.status(200).json("product deleted successfully")
  }catch (err) {
    console.log(err)
  }
})

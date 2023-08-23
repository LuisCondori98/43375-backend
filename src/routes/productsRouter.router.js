import { Router } from "express";
// import { ProductManager } from "../../DAO/managerFileSystem/ProductManager.js";
import productsModel from "../../DAO/mongo/models/products.model.js";
import { uploader } from "../utils.js";
import cartsModel from "../../DAO/mongo/models/carts.model.js";

export const productsRouter = Router();

productsRouter.get("/", async (req, res) => {

  const { limit } = req.query || 10

  const page = req.query || 1
  
  try {
    const prods = await productsModel.find()
    // const prods = await productsModel.paginate({}, {limit})

    console.log(prods)

    // prods.docs = prods.docs.map(docs => docs.toObject())

    // return res.json(limit ? prods.splice(0, limit) : prods)
    return res.json(prods)

  }catch (err) {
    return res.json(err)
  }
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

productsRouter.post("/addCart", async (req, res) => {

  const addCart = await cartsModel.create(req.body)

  // cartsModel.product.push(addCart)

  return res.json(req.body)
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

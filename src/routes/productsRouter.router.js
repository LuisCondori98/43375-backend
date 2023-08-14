import { Router } from "express";
// import { ProductManager } from "../../DAO/managerFileSystem/ProductManager.js";
import productsModel from "../../DAO/mongo/models/products.model.js";
import { uploader } from "../utils.js";

export const productsRouter = Router();

productsRouter.get("/", async (req, res) => {

  const { limit } = req.query
  
  try {
    const prods = await productsModel.find()

    return res.json(limit ? prods.splice(0, limit) : prods)

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

import { Router } from "express";
import cartsModel from "../../DAO/mongo/models/carts.model.js";
// import { CartManager } from "../../DAO/managerFileSystem/CartManager.js";

export const cartsRouter = Router();

cartsRouter.get('/', async (req, res) => {

  const carts = await cartsModel.find()

  console.log(carts)

  return res.json(carts)
});

cartsRouter.get('/:cid', (req, res) => {

  const { cid } = req.params

  res.send(cart.getProductById(parseInt(cid)))
});

cartsRouter.post("/", async(req, res) => {

  const body = req.body
  
  const data = await cartsModel.create({
    title: body.title,
    price: body.price
  })

  return res.send(data)
})

cartsRouter.put("/:cid", (req, res) => {

})

cartsRouter.put("/:cid/products/:pid", (req, res) => {

})

cartsRouter.delete("/:cid", (req, res) => {

})

cartsRouter.delete("/:cid/products/:pid", (req, res) => {
  
})

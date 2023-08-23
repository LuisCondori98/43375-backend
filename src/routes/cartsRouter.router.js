import { Router } from "express";
import cartsModel from "../../DAO/mongo/models/carts.model.js";
// import { CartManager } from "../../DAO/managerFileSystem/CartManager.js";

export const cartsRouter = Router();

cartsRouter.get('/', async (req, res) => {

  const carts = await cartsModel.find()

  return res.json(carts)
});

cartsRouter.get('/:cid', async (req, res) => {

  const { cid } = req.params

  // res.send(cart.getProductById(parseInt(cid)))

  res.send(await cartsModel.findOne({_id: cid}));
});

cartsRouter.put("/:cid", (req, res) => {
  
})

cartsRouter.put("/:cid/products/:pid", (req, res) => {

})

cartsRouter.delete("/:cid", async (req, res) => {

  const {cid} = req.query

  try {

    const prodDelete = await cartsModel.deleteOne(cid)

    return res.status(201).json(prodDelete)

  } catch (err) {

    return res.status(401).json({status: err})
  }
})

cartsRouter.delete("/:cid/products/:pid", (req, res) => {

})

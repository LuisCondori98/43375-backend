import productsModel from "../mongo/models/products.model.js";

export class ProductManager {
  constructor() {}

  getProducts = async () => {
    const prods = await productsModel.find()

    return prods
  }

  getProductById = async (id) => {

    const prods = await productsModel.findById(id)

    return prods
  }
}
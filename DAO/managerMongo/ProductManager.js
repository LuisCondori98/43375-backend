import productsModel from "../mongo/models/products.model.js";

export class ProductManager {
  constructor() {}

  addProduct = async (product) => {

    const prod = await productsModel.create(product)

    return prod
  }

  getProducts = async () => {

    const prods = await productsModel.find()

    return prods
  }

  getProductById = async (id) => {

    const prods = await productsModel.findById(id)

    return prods
  }

  deleteProduct = async (id) => {

    const prod = await productsModel.deleteOne(id)

    return prod
  }

  updateProduct = async (id, updateProduct) => {



  }
}
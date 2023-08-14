import fs from 'fs';

export class CartManager {
  constructor(path) {
    this.path = path;
    this.cart = fs.writeFileSync(this.path, "[]")
    const cartString = fs.readFileSync(this.path, "utf8")
    const carts = JSON.parse(cartString)
    this.cart = carts
  }

  static id = 100

  getCart() {
    return this.cart
  }

  getProductById(id) {
    const prodIdExists = this.cart.find(prod => prod.id === id)

    return prodIdExists.products
  }

  addCart() {

    const cartAdd = {
      id: CartManager.id,
      products: []
    }

    CartManager.id++
    this.cart.push(cartAdd)
    fs.writeFileSync(this.path, JSON.stringify(this.cart, null, 2))
    console.log("product added to cart")
  }
}
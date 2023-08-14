import fs from 'fs';

export class ProductManager {
    constructor(path) {
        this.path = path
        this.products = fs.writeFileSync(this.path, "[]")
        const productsString = fs.readFileSync(this.path, "utf8")
        const products = JSON.parse(productsString)
        this.products = products
    }

    static id = 1

    async addProduct(data) {

        const productToAdd = {
            id: ProductManager.id,
            title: data.title,
            description: data.description,
            price: parseInt(data.price),
            thumbnail: data.thumbnail,
            category: data.category,
            stock: parseInt(data.stock),
            code: data.code,
            status: true
        }

        if(data.title == null ||
            data.description == null ||
            data.price == null ||
            data.category == null ||
            data.stock == null ||
            this.products.find(prod => prod.code === data.code)) {
            console.log(this.products.find(prod => prod.code === data.code) ? `code repeated in producto ${productToAdd.id}` : `Un campo esta vacio en producto ${productToAdd.id}`)
        }else {
            ProductManager.id++
            this.products.push(productToAdd)
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2))
            console.log("product added")
            return productToAdd
        }
    }

    async getProducts() {

        const products = this.products

        try {
            return products
        }
        catch (err) {
            console.log(err)
        }
    }

    async getproductById(id) {

        const exists = await this.products.find(prod => prod.id === id)

        try {
            return exists

        }catch (err) {
            console.log(err)
        }
    }

    async updatedProduct(idProd, updatedProduct) {

        const idExists = await this.products.find(prod => prod.id === idProd)

        try {

            const {title, description, price, category, thumbnail, stock, code, ...id} = idExists

            const prodDelete = await this.products.findIndex(p => p.id === idProd)

            this.products.splice(prodDelete, 1)

            const prodNew = {
                title: updatedProduct.title,
                description: updatedProduct.description,
                price: updatedProduct.price,
                category: updatedProduct.category,
                thumbnail: updatedProduct.thumbnail,
                stock: updatedProduct.stock,
                code: updatedProduct.code
            }

            const newProduct = {...id, ...prodNew}

            this.products.push(newProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
            console.log(idExists)

        }catch (err) {
            console.log(err)
        }
    }

    deleteProduct(idProd) {
        const prodIdDelete = this.products.findIndex(p => p.id === idProd)

        if(prodIdDelete === -1) {
            console.log(`product id: ${idProd} not found`)
        }else {
            this.products.splice(prodIdDelete, 1)
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2))
            console.log(`product id: ${idProd} deleted`)
        }

    }
}

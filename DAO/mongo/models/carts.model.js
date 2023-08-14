import mongoose from 'mongoose';

const cartsSchema = mongoose.Schema({
  title: String,
  price: Number
})

const cartsModel = mongoose.model("carts", cartsSchema)

export default cartsModel

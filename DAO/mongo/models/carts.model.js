import mongoose from 'mongoose';

const cartsSchema = mongoose.Schema({
  Product: {
    type: Array,
    default: []
  },
  Quantity: Number
})

const cartsModel = mongoose.model("carts", cartsSchema)

export default cartsModel

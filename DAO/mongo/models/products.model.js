import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productsSchema = mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  category: String,
  stock: Number,
  code: {
    type: String,
    unique: true,
  },
  status: Boolean
})

productsSchema.plugin(mongoosePaginate)

const productsModel = mongoose.model("products", productsSchema)

export default productsModel

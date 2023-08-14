import mongoose from "mongoose";

const msgSchema = mongoose.Schema({
  user: String,
  message: String
})

const msgModel = mongoose.model("messages", msgSchema)

export default msgModel

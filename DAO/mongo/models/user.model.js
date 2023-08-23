import mongoose from "mongoose";

export const userSchema = mongoose.Schema({

  name: String,
  lastname: String,
  email: String,
  age: Number,
  password: String

})

const userModel = mongoose.model("user", userSchema)

export default userModel
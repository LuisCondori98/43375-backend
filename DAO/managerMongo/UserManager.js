import userModel from "../mongo/models/user.model.js"

export class UserManager {
  constructor() {

  }

  addUser = async(data) => {

    const user = await userModel.create(data)

    return user
  }

  getUsers = async () => {
    
    const user = await userModel.find()

    return user
  }

  getUserById(id) {

  }

  deleteUser(id) {

  }

}
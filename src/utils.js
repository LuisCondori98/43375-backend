import multer from "multer"
import bcrypt from "bcrypt"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img')
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname/*`${file.originalname}-${new Date().toISOString()}`*/)
  }
})

export const uploader = multer({storage})


export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword)

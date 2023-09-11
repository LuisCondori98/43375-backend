import multer from "multer"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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


const PRIVATE_KEY = 'jwtsecret'

export const generateToken = (payload) => {

  const token = jwt.sign({ user: payload }, PRIVATE_KEY, { expiresIn: '24h' })

  return token
}

export const verifyToken = (token) => {

  return new Promise((resolve, reject) => {

    jwt.verify(token, PRIVATE_KEY, (err, payload) => {

      if (err) {
        
        return reject(err)
      }

      return resolve(payload)
    })
  })
}

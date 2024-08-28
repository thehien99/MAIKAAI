const db = require("../models")
const jwt = require('jsonwebtoken')
require('dotenv').config()

const loginService = (data) => {

  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id: data.id },
        raw: true,
        attributes: { exclude: ['email'] }
      })
      const token = jwt.sign({
        id: response?.id
      }, process.env.ACCESS_TOKKEN_SECRET, { expiresIn: '2d' })
      resolve({
        err: token ? 0 : 2,
        response,
        msg: 'Login Success'
      })
    } catch (error) {
      reject(error)
    }
  })

}

module.exports = {
  loginService: loginService
}

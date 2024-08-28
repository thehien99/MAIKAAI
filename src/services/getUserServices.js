const db = require('../models/index')
const getUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id: data },
        raw: true,
        attributes: { exclude: ['token', 'email'] }
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })

}

module.exports = {
  getUser: getUser
}
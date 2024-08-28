const getUserServices = require('../services/getUserServices')
const getUserController = async (data, res) => {
  try {
    const response = await getUserServices.getUser(data)
    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getUserController }
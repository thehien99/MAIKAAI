const authServices = require('../services/authService')

const loginController = async (data, res) => {

  try {
    // if (!data?.id || !data?.token) {
    //   return res?.status(500)?.json('khong ton tai')
    // }
    const response = await authServices.loginService(data)
    console.log(response)
    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  loginController: loginController
}
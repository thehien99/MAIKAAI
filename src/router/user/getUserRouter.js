const express = require('express')
const getUserController = require('../../controllers/getUserController')
const verifyToken = require('../../middleware/checkAuth')

const router = express.Router()

const getUserRouter = (app) => {
  router.get('/getOneUser', verifyToken, (req, res) => {
    getUserController.getUserController(req.user, res)
  })

  return app.use('/', router)
}

module.exports = getUserRouter
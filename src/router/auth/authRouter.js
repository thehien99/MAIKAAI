const express = require('express');
const passport = require('passport');
const authController = require('../../controllers/authController')

require('dotenv').config()

let router = express.Router();

const authRouter = (app) => {

  //LOGIN GOOGLE
  router.get('/auth/google',
    passport.authenticate('google', {
      scope:
        ['email', 'profile'],
      session: false
    }
    ));

  router.get(`https://maikaai.onrender.com/auth/callback`, (req, res, next) => {
    passport.authenticate('google', (err, profile) => {
      req.user = profile
      next()
    })(req, res, next)
  }, (req, res) => {
    res.redirect(`${process.env.URL_CLIENT}`)
  })


  //LOGIN
  router.post('/', (req, res) => {
    authController.loginController(req.body, res)
  })

  return app.use('/', router)
}

module.exports = {
  authRouter: authRouter
}
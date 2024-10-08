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
    }
    ));

  router.get('/auth/google/callback', (req, res, next) => {
    passport.authenticate('google', (err, profile) => {
      req.user = profile
      next()
    })(req, res, next)
  }, (req, res) => {
    res.redirect(`${process.env.URL_CLIENT}/login`)
  })


  //LOGIN
  router.post('/login', (req, res) => {
    authController.loginController(req.body, res)
  })

  return app.use('/', router)
}

module.exports = {
  authRouter: authRouter
}
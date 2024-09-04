const passport = require('passport');
const db = require('./src/models/index')
const jwt = require('jsonwebtoken')
const GoogleStrategy = require('passport-google-oauth2').Strategy;
require('dotenv').config()


const loginUseGoogle = () => {
  passport.use(new GoogleStrategy({
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: '/google/callback',
  },

    async function (profile, cb) {
      console.log('profile', profile)
      try {
        const token = jwt.sign({ id: profile?.id }, process.env.ACCESS_TOKKEN_SECRET, { expiresIn: '1d' });
        const response = await db.User.findOrCreate({
          where: { id: profile?.id },
          defaults: {
            id: profile?.id,
            email: profile?.email,
            name: profile?.given_name,
            role: profile?.provider,
            token
          }
        })
        if (!response[1]) {
          await db.User.update({
            token
          }, { where: { id: profile?.id } })
        }
        resolve(response)
      } catch (error) {
        reject(error)
      }
      return cb(profile)
    }
  ));
}



module.exports = {
  loginUseGoogle: loginUseGoogle,
}
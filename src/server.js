const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { authRouter } = require('./router/auth/authRouter')
const { loginUseGoogle } = require('../passport')
const getUserRouter = require('./router/user/getUserRouter')

require('dotenv').config();

let app = express()
app.use(express.json()); // Để phân tích JSON
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: true }))
//config app


authRouter(app)
getUserRouter(app)
loginUseGoogle()


let port = process.env.PORT
app.listen(port, () => {
  console.log('localhost connect', port || 3000);
})
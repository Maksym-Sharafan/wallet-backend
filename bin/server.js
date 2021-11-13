const mongoose = require('mongoose');
require('dotenv').config();

const app = require('../app')

const { DB_NAME, DB_USER, DB_USER_PASS, PORT = 3001 } = process.env
const DB_HOST = `mongodb+srv://${DB_USER}:${DB_USER_PASS}@cluster0.yncdl.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT)
    console.log(`"${DB_NAME}" Database connection successful. Use our API on port: ${PORT}`)
  })
  .catch(error => {
    console.log(error.message)
    process.exit(1);
  })




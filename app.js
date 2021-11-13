const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const transactionsRouter = require('./routes/api/transactionsRoutes')
const categoriesRouter = require('./routes/api/categoriesRoutes')
const apiDocsRouter = require('./routes/api/apiDocsRoutes')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger));
app.use(cors());

app.use('/api/transactions', transactionsRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/api-docs', apiDocsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message })
})

module.exports = app







// const mongoose = require('mongoose');
// const DB_HOST = "mongodb+srv://Iryna:pjfa9DtKd2YbLDqU@cluster0.yncdl.mongodb.net/wallet?retryWrites=true&w=majority"

// mongoose.connect(DB_HOST)
//   .then(() => {
//     // app.listen(PORT)
//     console.log('Database connection successful')
//   })
//   .catch(error => {
//     console.log(error.message)
//     process.exit(1);
//   })
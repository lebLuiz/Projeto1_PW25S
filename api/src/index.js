require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const cors = require('./app/middlewares/cors');
const routes = require('./routes');
const errorHandler = require('./app/middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandler);

// CREDENCIALS
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.paybqlu.mongodb.net/?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log('Conectou ao banco Mongo');
    app.listen(3000, () => console.log('🔥 Server started at http://localhost:3000'));
  })
  .catch((err) => console.log(err));

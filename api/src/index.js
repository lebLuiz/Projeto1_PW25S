require('dotenv').config();
const express = require('express');

const cors = require('./app/middlewares/cors');
const routes = require('./routes');
const errorHandler = require('./app/middlewares/errorHandler');
const { sequelize } = require('./app/models');

const app = express();

app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandler);

sequelize.sync()
  .then(() => {
    app.listen(3000, () => console.log('🔥[BACK-END] started at http://localhost:3000'));
  })
  .catch((err) => {
    console.log('ERROR: ', err);
  });

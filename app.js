require('dotenv').config();
const models = require('./server/models');

models.sequelize.sync();
// console.log(models);

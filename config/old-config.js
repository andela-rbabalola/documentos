const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  databaseName: process.env.DB_NAME,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST
};

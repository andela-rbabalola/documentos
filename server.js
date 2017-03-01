import express from 'express';
import parser from 'body-parser';
import home from './server/routes/index';
import userRoute from './server/routes/users';
import roleRoute from './server/routes/roles';
import documentRoute from './server/routes/documents';

require('dotenv').config();

// const routes = require('./server/routes/index');

const app = express();
// const router = express.Router();
const port = process.env.PORT || 5000;
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

// routes(router);

app.use('/', home);
app.use('/users', userRoute);
app.use('/roles', roleRoute);
app.use('/documents', documentRoute);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

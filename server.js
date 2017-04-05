import express from 'express';
import webpack from 'webpack';
import path from 'path';
import open from 'open';
import parser from 'body-parser';
import config from './webpack.config.dev';
import home from './server/routes/index';
import userRoute from './server/routes/users.routes';
import roleRoute from './server/routes/roles.routes';
import documentRoute from './server/routes/documents.routes';
import searchRoute from './server/routes/search.routes';
import paginationRoute from './server/routes/pagination.routes';

/* eslint-disable no-console */
/* eslint-disable global-require */

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
const compiler = webpack(config);

if (process.env.NODE_ENV !== 'test' || process.env.NODE_ENV !== 'production') {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}


app.use('/users', userRoute);
app.use('/roles', roleRoute);
app.use('/documents', documentRoute);
app.use('/search', searchRoute);
app.use('/pagination', paginationRoute);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/src/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listening on port ${port}`);
    open(`http://localhost:${port}`);
  }
});

export default app;

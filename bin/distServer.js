import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import open from 'open';
import parser from 'body-parser';
import compression from 'compression';
import userRoute from '../server/routes/users.routes';
import roleRoute from '../server/routes/roles.routes';
import documentRoute from '../server/routes/documents.routes';
import searchRoute from '../server/routes/search.routes';
import paginationRoute from '../server/routes/pagination.routes';

// import app from '../server';


/* eslint-disable no-console */

const port = process.env.PORT || 5000;
const app = express();
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(compression());
app.use(express.static('dist'));
app.use(favicon(path.join(__dirname, '../client', 'src/images/dms.jpg')));
app.use('/users', userRoute);
app.use('/roles', roleRoute);
app.use('/documents', documentRoute);
app.use('/search', searchRoute);
app.use('/pagination', paginationRoute);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listening on port ${port}`);
    open(`http://localhost:${port}`);
  }
});

app.timeout = 10000;

const express = require('express');
const routes = require('./routes/index');
const newsRoute = require('./routes/news');
//const authRoute = require('./routes/auth');
const authRoute = require('./routes/userauth');

const cors = require('cors');
//const mongoose = require('mongoose');
const mysql = require('mysql');
const bodyParser = require('body-parser');
//const passport = require('passport');
const authCheckMiddleware = require('./middleware/authCheck');


require('dotenv').config();

let app = express();
//const PORT = process.env.PORT || 3002;

//const dbURL = process.env.MONGO_DB_URL

/* app.use(function(req, res, next) {
  res.locals.connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'newsapp'
  });
  res.locals.connection.connect();
  next();
}); */

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/', routes);
app.use('/news', newsRoute);

app.use('/user', authRoute);

//app.use('/news/:id/comment', authCheckMiddleware);
//app.use('/news', newsRoute);




/* const PORT = 3002; */

const  port  =  process.env.PORT  ||  3000;
const  server  =  app.listen(port, () => {
    console.log('Server listening at http://localhost:'  +  port);
}); 

/* app.listen(PORT, function () {
	console.log(`Listening on port ${PORT}`);
}); */


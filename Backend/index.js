const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const http = require('http');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const debug = require('debug')('backend:server');
const path = require('path');

const index = require('./src/routers/index');
const portUtils = require('./src/config/port');

const app = express();

// compressing api response
app.use(compression());

// logger
app.use(morgan('dev'));

// Get port from environment and store in Express.
const PORT = portUtils.normalizePort(process.env.PORT || '5000');
app.set('port', PORT);

// cors enable
app.use(cors());

// data sanitization against xss
app.use(xss());

// security config
app.use(helmet());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization'
  );

  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Pass to next layer of middleware
  next();
});
// TODO: connection with client setup

 app.use(express.static(path.join(__dirname, '../Frontend/build')));
//
 app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '../Frontend/build/index.html'));
   });


// all the api routers
app.use('/api', index);

// index setup
const server = http.createServer(app);

// Event listener for HTTP server 'listening' event.
const onListening = () => {
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port ${address.port}`;
  debug(`Server running on ${bind}, http://localhost:${address.port}`);
  console.log(`Server running on ${bind}, http://localhost:${address.port}`);
};

// Listen on provided port, on all network interfaces.
server.listen(PORT);
server.on('error', portUtils.onError);
server.on('listening', onListening);

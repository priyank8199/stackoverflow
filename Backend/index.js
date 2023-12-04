const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const http = require('http');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const path = require('path'); // Add this line
const debug = require('debug')('backend:server');

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

// Serve static files from the 'Frontend/build' directory
app.use(express.static(path.join(__dirname, '../Frontend/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/build', 'index.html')); // Fix the path
});

// all the api routers
app.use('/api', index);

// index setup
const server = http.createServer(app);

// Event listener for HTTP server 'listening' event.
const onListening = () => {
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port ${address.PORT}`;
  debug(`Server running on ${bind}, http://localhost:${address.PORT}`);
  console.log(`Server running on ${bind}, http://localhost:${address.PORT}`);
};

// Listen on provided port, on all network interfaces.
server.listen(PORT);
server.on('error', portUtils.onError);
server.on('listening', onListening);

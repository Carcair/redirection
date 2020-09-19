//////////////////////////////////////
//                                  //
//        URL shortening app        //
//       Redirection service        //
//            Entry Point           //
//                                  //
//////////////////////////////////////

// TODO:
// FIXME:

/**
 * Loading modules
 */
const express = require('express');
const cors = require('cors');
const Transfer = require('./modules/Transfer');

/**
 * Loading secret variables
 */
const { port } = require('../config');

/**
 * Initialize express
 */
const app = express();

/**
 * Initialize middleware
 */
app.use(express.json({ limit: '500kb' }));
app.use(cors());

/**
 * Start listening
 */
// Initialize Transfer class
const transfer = new Transfer();

// Start watching RabbitMQ server
transfer.getAllUrls();
transfer.newUrl();
transfer.delUrl();
transfer.sendBaseUrl();

/**
 * Load routes
 */
const redirect = require('./routes/redirect');

/**
 * Use routes
 */
app.use('/', redirect);

/**
 * Create http server
 */
app.listen(port, () => {
  console.log(`Listening ${port}`);
});

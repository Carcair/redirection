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

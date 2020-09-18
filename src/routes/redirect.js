/**
 * Load modules
 */
const express = require('express');
const ERLimit = require('express-rate-limit');

/**
 * Load controller
 */
const { getUrl } = require('../controllers/redirectCtrl');

/**
 * Load Router middleware
 */
const router = express.Router();

/**
 * Redirect route
 *
 * According to assignment description
 * we are returning 302 response instead of
 * redirecting the route
 */
router.get('/:code', getUrl);

module.exports = router;

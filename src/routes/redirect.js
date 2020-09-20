/**
 * Load modules
 */
const express = require('express');
const ERLimit = require('express-rate-limit');
const { rateCheck } = require('../util/rateLimit');

/**
 * Load controller
 */
const { redirectToUrl } = require('../controllers/redirectCtrl');

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
router.get('/:code', rateCheck, redirectToUrl);

module.exports = router;

/**
 * Rate Limiter Middlerware
 * We'll use Redis caching system to observe
 * requested URLs
 */

/**
 * Load modules
 */
const { redisCheckRate } = require('../service/RedisHandler');

/**
 * Rate limiter middleware
 */
exports.rateCheck = (req, res, next) => {
  // As Redis key for Rate Limiter
  // we'll use only last params value
  const requestedURL = req.params.code;

  /**
   * Check how many times was this URL requested
   */
  redisCheckRate(requestedURL)
    .then((result) => {
      if (result === false) {
        // We get false as returned value if limit was not approached
        next();
      } else {
        // Limit of 10 requests per 120 seconds is approached
        res.status(429).end('Too Many Requests');
      }
    })
    .catch((err) => console.log(err));
};

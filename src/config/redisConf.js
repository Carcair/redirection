/**
 * Load modules
 */
const redis = require('redis');

/**
 * Load variables
 */
const { redisUrl } = require('../../config');

/**
 * Create Redis client
 * (port[, host])
 */
const client = redis.createClient({
  port: '6379',
  host: redisUrl,
});

module.exports = client;

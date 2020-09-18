/**
 * Load modules
 */
const redis = require('redis');

/**
 * Load variables
 */
const { redisPort } = require('../../config');

/**
 * Create Redis client
 * (port[, host])
 */
const client = redis.createClient(redisPort);

module.exports = client;



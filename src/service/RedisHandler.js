/**
 * Load Redis conf
 */
const moment = require('moment');
const client = require('../config/redisConf');

/**
 * Object containing all redis methods we'll use
 */
const RedisHandler = {
  /**
   * URL Redis caching
   */
  // Method to insert URL into Redis
  redisInsert(url) {
    client.set(url.shortURL, JSON.stringify(url));
  },

  // Method to delete a url by it's key in Redis
  redisDelete(url) {
    client.del(url.shortURL, (err, reply) => {
      if (err) reject(err);
    });
  },

  // Method to get back a url by it's key in Redis
  redisGet(key) {
    return new Promise((resolve, reject) => {
      // Communicate with Redis
      client.get(key, (err, data) => {
        if (err) reject(err);

        if (data !== null) {
          // Url exists
          const urlObj = JSON.parse(data);
          resolve(urlObj.realURL);
        } else {
          // If there is no asked url
          resolve(404);
        }
      });
    });
  },

  /**
   * RateLimit Redis caching
   */
  redisCheckRate(key) {
    return new Promise((resolve, reject) => {
      client.exists(key, (err, reply) => {
        // Redis error
        if (err) reject(err);

        // Successful Redis connection
        if (reply === 1) {
          // Key exists
          // Get info about last request
          client.get(key, (err, data) => {
            if (err) reject(err);

            // Parse data we received
            const requested = JSON.parse(data);

            // Check if URL is requested 10 or more times
            if (requested.attempted >= 10) {
              resolve(true);
            } else {
              // Increment attempt number by 1
              requested.attempted++;

              // Set new expiration time for Redis input
              const newRedisExp = moment().unix() - requested.startTime;

              // Overwrite Redis cache value with new expiration time
              // and new number of attempts on this URL
              client.setex(key, newRedisExp, JSON.stringify(requested));
              resolve(false);
            }
          });
        } else {
          // First time URL requested

          // Ready object for Redis input
          const startTime = moment().unix();
          const attempted = 1;
          const requested = {
            startTime,
            attempted,
          };

          // Insert into Redis cache
          // Expiration time is set to 120 secs
          client.setex(key, 120, JSON.stringify(requested));
          resolve(false);
        }
      });
    });
  },
};

module.exports = RedisHandler;

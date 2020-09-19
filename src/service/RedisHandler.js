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

/**
 * Object containing all redis methods we'll use
 */
const RedisHandler = {
  // Method to insert into Redis
  redisInsert(url) {
    client.setex(url.shortURL, 3600, JSON.stringify(url));
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
};

module.exports = RedisHandler;

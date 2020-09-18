/**
 * Load redis config
 */
const client = require('../config/redisConfig');

/**
 * Object containing all redis methods we'll use
 */
const RedisHandler = {
  // Catch connection event
  redisConnect: () => {
    client.on('connect', () => console.log('Connected to Redis'));
  },

  // Catch error event
  redisError: () => {
    client.on('error', (err) => console.log('Redis error', err));
  },

  // Catch reconnecting event
  redisReconnect: () => {
    client.on('reconnecting', () => console.log('Redis reconnecting.'));
  },

  // Catch end event
  redisEnd: () => {
    client.on('end', () => console.log('Redis disconnected.'));
  },

  // Method to call to insert into Redis
  redisInsert: (key, payload) => {
    client.setex(key, 3600, payload);
  },

  // Method to get back a url by it's key in Redis
  redisGet: (key) => {
    return new Promise((resolve, reject) => {
      client.get(key, (err, data) => {
        if (err) reject(err);

        if (data !== null) {
          const urlObj = JSON.parse(data);
          resolve(urlObj.realURL);
        } else {
          resolve(404);
        }
      });
    });
  },

  // Method to delete a url by it's key in Redis
  redisDelete: (key) => {
    return new Promise((resolve, reject) => {
      client.del(key, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  },
};

module.exports = RedisHandler;

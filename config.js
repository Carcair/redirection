/**
 * Secret variables for application
 * if necessary transcrypt the file
 */
const config = {
  // Environment
  env: process.env.NODE_ENV || 'development',

  // Port number
  port: process.env.PORT || '5005',

  // Redis port
  redisUrl: process.env.REDIS_URL || 'localhost',

  // Rabbit port
  rabbitUrl: process.env.RABBIT_URL || 'localhost',
};

module.exports = config;

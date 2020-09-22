/**
 * Secret variables for application
 * if necessary transcrypt the file
 */
const config = {
  // Environment
  NODE_ENV: 'development',
  // env: 'production',

  // Port number
  port: 5005,

  // Redis port
  redisUrl: `${process.env.REDIS_URL}` || 'localhost',

  // Rabbit port
  rabbitUrl: `${process.env.RABBIT_URL}` || 'localhost',
};

module.exports = config;

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
  redisPort: 6379,
};

module.exports = config;

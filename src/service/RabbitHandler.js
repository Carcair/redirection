/**
 * Load modules
 */
const RedisHandler = require('./RedisHandler');

const RabbitHandler = {
  /**
   * Consume first payload
   * Every URL existing in DB is sent on APP startup
   */
  allUrls: (conn) => {
    // Create a channel to RabbitMQ
    conn.createChannel(async (err, channel) => {
      if (err) throw err;

      // Asserting queue on transfer called firstPayload
      await channel.assertQueue('firstPayload');

      // Consume payload this transfer sends
      await channel.consume('firstPayload', async (payload) => {
        if (payload !== null) {
          // We need to extract data from Buffer we recieve from RabbitMQ
          const tempPayload = JSON.parse(payload.content.toString());

          // Acknowledge that data was received, stops from recieving same data
          await channel.ack(payload);

          // Iterate each url seperataly
          tempPayload.forEach((url) => {
            // Insert into Redis
            RedisHandler.redisInsert(url);
          });
        }
      });
    });
  },

  /**
   * Consume every new URL
   */
  newUrl: (conn) => {
    // Create a channel to RabbitMQ
    conn.createChannel(async (err, channel) => {
      if (err) throw err;

      // Asserting queue on transfer called firstPayload
      await channel.assertQueue('newUrl');

      // Consume payload this transfer sends
      await channel.consume('newUrl', async (payload) => {
        if (payload !== null) {
          // We need to extract data from Buffer we recieve from RabbitMQ
          const tempPayload = JSON.parse(payload.content.toString());

          // Acknowledge that data was received
          await channel.ack(payload);

          // Insert into Redis
          RedisHandler.redisInsert(tempPayload);
        }
      });
    });
  },

  /**
   * Delete a URL
   */
  delUrl: (conn) => {
    // Create a channel to RabbitMQ
    conn.createChannel(async (err, channel) => {
      if (err) throw err;

      // Asserting queue on transfer called firstPayload
      await channel.assertQueue('delUrl');

      // Consume payload this transfer sends
      await channel.consume('delUrl', async (payload) => {
        if (payload !== null) {
          // Extract data from buffer
          const tempPayload = JSON.parse(payload.content.toString());

          // Acknowledge data received
          await channel.ack(payload);

          // Delete from Redis
          RedisHandler.redisDelete(tempPayload);
        }
      });
    });
  },
};

module.exports = RabbitHandler;

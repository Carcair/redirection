/**
 * Load modules
 */
const rabbit = require('amqplib/callback_api');
const RabbitHandler = require('../service/RabbitHandler');

/**
 * Class containing all operations going through RabbitMQ server
 */
class Transfer {
  // Get all URLs
  async getAllUrls() {
    await rabbit.connect('amqp://localhost:5672', async (err, conn) => {
      if (err) throw err;

      await RabbitHandler.newUrl(conn);
    });
  }

  // Get new URL
  async newUrl() {
    await rabbit.connect('amqp://localhost:5672', async (err, conn) => {
      if (err) throw err;

      await RabbitHandler.allUrls(conn);
    });
  }

  // Del a URL
  async delUrl() {
    await rabbit.connect('amqp://localhost:5672', async (err, conn) => {
      if (err) throw err;

      await RabbitHandler.delUrl(conn);
    });
  }

  // Send protocol and host from Redirection service to Management service
  async sendBaseUrl() {
    await rabbit.connect('amqp://localhost:5672', async (err, conn) => {
      if (err) throw err;

      
    });
  }
}

module.exports = Transfer;

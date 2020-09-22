/**
 * Load modules
 */
const rabbit = require('amqplib/callback_api');
const RabbitHandler = require('../service/RabbitHandler');

/**
 * Load secret variable
 */
const { rabbitUrl } = require('../../config');

/**
 * Class containing all operations going through RabbitMQ server
 */
class Transfer {
  // Get all URLs
  getAllUrls() {
    rabbit.connect(`amqp://${rabbitUrl}:5672`, (err, conn) => {
      if (err) throw err;

      RabbitHandler.allUrls(conn);
    });
  }

  // Get new URL
  newUrl() {
    rabbit.connect(`amqp://${rabbitUrl}:5672`, (err, conn) => {
      if (err) throw err;

      RabbitHandler.newUrl(conn);
    });
  }

  // Del a URL
  delUrl() {
    rabbit.connect(`amqp://${rabbitUrl}:5672`, (err, conn) => {
      if (err) throw err;

      RabbitHandler.delUrl(conn);
    });
  }
}

module.exports = Transfer;

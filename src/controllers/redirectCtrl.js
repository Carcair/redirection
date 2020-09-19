/**
 * Load modules
 */
const RedisHandler = require('../service/RedisHandler');

exports.redirectToUrl = (req, res) => {
  // Get whole URL
  const url = `${req.protocol}://${req.headers.host}/${req.params.code}`;

  // call on function to insert into Redis
  RedisHandler.redisGet(url)
    .then((result) => {
      if (result === 404) {
        // Url not found
        res.status(404).end('URL not found');
      } else {
        // Url found

        // Keep in case redirecting is necessary
        // res.redirect(result);

        // Send back response instead of redirecting
        res.status(302).end(`Real URL is: ${result}`);
      }
    })
    .catch((err) => console.log(err));
};
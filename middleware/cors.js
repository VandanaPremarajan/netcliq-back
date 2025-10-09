const cors = require('cors');

const corsMiddleware = cors({
  origin: 'https://netcliq-front.vercel.app', // your frontend
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

module.exports = function runCors(req, res) {
  return new Promise((resolve, reject) => {
    corsMiddleware(req, res, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};
